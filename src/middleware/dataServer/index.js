var bitcoin = require('../../lib/bitcoin');
var request = require('superagent');

var config = require('config');
var featherClient = require('../../lib/featherClient');

var jwtdecode = require('jwt-decode');

var dataServer = featherClient.socketio(config.get('dataServer'));

// dataServer.authenticate({
//   strategy: "other",
//   username: "volure",
//   password: "MyPassword"
// }).then(response => {
//   return dataServer.passport.verifyJWT(response.accessToken);
// }).then(payload => {
//   return dataServer.service('users').get(payload._id);
// }).then(user => {
//   dataServer.set('user', user);
// }).catch(function (error) {
//   console.error('Error authenticating!', error);
// });
//  .then(payload => {
//   console.log("Incoming Token: ", dataServer.storage.getItem("feathers-jwt"))
//   console.log("Login:", payload)
//   dataServer.service('users').find().then((result) => {
//     console.log("Results:", results);
//     user = jwtdecode(payload.accessToken);

//     dataServer.service('users').get(user._Id).then(result => {
//       console.log("Result:User", result);
//     })
//   })

// })

dataServer.on("connected", (socket) => {
  console.log("Connected:", socket);
})
dataServer.on("disconnected", (socket) => {
  console.log("Disconnected:", socket)
})
dataServer.service("users").on("created", (user) => {
  console.log("###################################")
  console.log("############## users ##############")
  console.log("###################################")
  console.log("User:", user);
})
console.log("Watcher Listening")
console.log("Transactions Watcher")






module.exports = function (app) {

  function init(app) {
    module.exports.requestService = app.service('requests');
    module.exports.walletService = app.service('wallets');
    module.exports.transactionService = app.service('bitcoin-transactions');
    module.exports.pendingTransactionService = app.service('bitcoin-pending-transactions');

    if (!module.exports.transactionService) {
      setTimeout(() => {
        init(app);
      }, 100)
    }
    else {

      module.exports.dataServer = dataServer;

      var loginData = {
        strategy: "other",
        username: "webServer",
        password: "MyPassword"
      };

      var refreshToken = () => {
        module.exports.dataServer.logout().then(result => {
          module.exports.dataServer.authenticate(loginData).then(response => {
            var jwtData = jwtdecode(response.accessToken);
            var exp = new Date(jwtData.exp * 1000);
            exp.setSeconds(exp.getSeconds() - 20);
            var msExp = exp.getTime() - Date.now()
            if (msExp < 1) msExp = 1;
            setTimeout(refreshToken, msExp)
          }).catch(error => {
            console.log('Error Authorizing:', error);
          });
        }).catch(err => {
          console.log('Unable to logout');
        });

      }



      module.exports.dataServer.authenticate(loginData).then(response => {
        var jwtData = jwtdecode(response.accessToken);
        var exp = new Date(jwtData.exp * 1000);
        exp.setSeconds(exp.getSeconds() - 20);
        var msExp = exp.getTime() - Date.now()
        if (msExp < 1) msExp = 1;
        setTimeout(refreshToken, msExp)
      }).catch(function (error) {
        console.error('Error authenticating!', error);
      });




      var updateQueue = {};

      var syncBusy = false;

      function syncServer() {
        if (syncBusy) return;
        syncBusy = true;
        var uQueue = updateQueue;
        updateQueue = {};

        function performSync(syncQueue) {

          var promises = Object.keys(uQueue).map((key) => {
            console.log("Enqueue:", key)
            return new Promise(uQueue[key]).then(result => {
              delete uQueue[key];
              return result;
            }).catch(err => {
              console.log('Trouble executing updateQueue item:', key);
              return err;
            });
          });

          var timeout = new Promise((resolve, reject) => {
            var timeoutInt = setInterval(() => {
              if (Object.keys(uQueue).length === 0) {
                resolve();
              }
            }, 100);

            setTimeout(() => {
              clearInterval(timeoutInt);
              reject('Sync Taking Too Long.');
            }, 10000);
          });

          promises.push(timeout);
          Promise.all(promises).then(result => {
            syncBusy = false;
          }).catch(err => {
            syncBusy = false;
            console.log('Sync failed:', err);
          });

        }
        performSync(uQueue);
      }

      function serverUpdate (request) {
        switch (request.request) {
          case 'GET_BITCOIN_WALLET':
            module.exports.requestService.update(request._id, {
              $set: {
                webServerCantResolve: true,
              }
            }).then((check) => {
              console.log('check for added fields',check)
            }).catch(error => console.log('serverUpdate error', error))
            break;
        }
      }

      module.exports.dsRequestService = module.exports.dataServer.service('requests');
      module.exports.dsWalletService = module.exports.dataServer.service('wallets');
      module.exports.dsTransactionService = module.exports.dataServer.service("bitcoin-transactions")
      module.exports.dsPendingTransactionService = module.exports.dataServer.service("bitcoin-pending-transactions")

      module.exports.dsRequestService.on('created', (request) => {
        console.log('About to create request: webserver-dsRequestService')
        module.exports.requestService.create(request).then(request => {
          console.log('About to create request on DS', request)
        }).catch(error => {
          console.log('unable to create request on DS', error)
        })
      })

      module.exports.requestService.on('created', (request) => {
        console.log('About to create request: webserver-requestService', request)
        module.exports.dsRequestService.create(request).then(request => {
          console.log('About to create request on WS', request)
          serverUpdate(request)
        }).catch(error => {
          console.log('unable to create request on WS', error)
        })
      })

      module.exports.dsRequestService.on('updated', (request) => {
        updateQueue[`updated:serverRequest:${request._id}`] = (resolve, reject) => {
          console.log('About to update request - dsRequestService', request)
            module.exports.requestService.update(request._id, {$set:request} ).then((request) => {
              console.log('About to update request on WS', request)
              resolve();
            }).catch(error => {
              console.log('unable to update request on WS', error)
              reject();
            })
        }
      })

      module.exports.requestService.on('updated', (request) => {
        console.log('About to update request - requestService', request)
        updateQueue[`updated:dataServerRequest:${request._id}`] = (resolve, reject) => {
            console.log('About to update request - requestService')
            module.exports.dsRequestService.update(request._id, {$set:request} ).then((request) => {
              console.log('About to update request on DS', request)
              resolve();
            }).catch(error => {
              console.log('unable to update request on DS', error)
              reject();
            })
        }
      })

      module.exports.dsWalletService.on('created', (wallet) => {
        console.log("About to create wallet")
        module.exports.walletService.create(wallet).then(wallet => {
          console.log("About to create wallet on DS")
        }).catch(error => {
          console.log('unable to create wallet on Ds', error)
        })
      })

      module.exports.dsWalletService.on('updated', (wallet) => {
        console.log("About to create wallet")
        module.exports.walletService.update(wallet._id, wallet).then(wallet => {
          console.log("About to create wallet on DS")
        }).catch(error => {
          console.log('unable to create wallet on Ds', error)
        })
      })

      module.exports.dsTransactionService.on("created", (transaction) => {
        module.exports.transactionService.create(transaction).then((transaction) => {
          console.log('Created transaction', transaction)
        }).catch(err => console.log('web-server add transaction', err))
      })

      module.exports.dsTransactionService.on("removed", (transaction) => {
        module.exports.transactionService.remove(transaction).then((transaction) => {
          console.log('Removed transaction', transaction)
        }).catch(err => console.log('web-server remove transaction', err))
      })


      module.exports.dsPendingTransactionService.on("created", (transaction) => {
        module.exports.pendingTransactionService.create(transaction).then((transaction) => {
          console.log('Created transaction', transaction)
        }).catch(err => console.log('web-server add pending transaction', err))
      })

      module.exports.dsPendingTransactionService.on("updated", (transaction) => {
        console.log("Updated Transaction:")
        module.exports.pendingTransactionService.update(transaction._id, transaction).then((transaction) => {
          console.log('Created transaction', transaction)
        }).catch(err => console.log('web-server add pending transaction', err))
      })

      module.exports.dsPendingTransactionService.on("removed", (transaction) => {
        module.exports.pendingTransactionService.remove(transaction).then((transaction) => {
          console.log('Removed transaction', transaction)
        }).catch(err => console.log('web-server remove pending transaction', err))
      })

      setInterval(() => {
        performUpdate(app);
      }, 10000);
    }
  }

  setTimeout(() => {
    init(app);
  }, 100)



}


function performUpdate(app) {


}
