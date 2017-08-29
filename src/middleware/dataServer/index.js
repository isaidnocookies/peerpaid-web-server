var bitcoin = require('../../lib/bitcoin');
var request = require('superagent');

var config = require('config');
var featherClient = require('../../lib/featherClient');

var jwtdecode = require('jwt-decode');

var dataServer = featherClient.socketio(config.get('dataServer'));

dataServer.authenticate({
  strategy: "other",
  username: "volure",
  password: "MyPassword"
}).then(response => {
  return dataServer.passport.verifyJWT(response.accessToken);
})
.then(payload => {
  return dataServer.service('users').get(payload._id);
}) 
.then(user => {
  dataServer.set('user', user);
})
.catch(function(error){
  console.error('Error authenticating!', error);
});
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
      
      module.exports.dsRequestService = module.exports.dataServer.service('requests');
      module.exports.dsWalletService = module.exports.dataServer.service('wallets');
      module.exports.dsTransactionService = module.exports.dataServer.service("bitcoin-transactions")
      module.exports.dsPendingTransactionService = module.exports.dataServer.service("bitcoin-pending-transactions")
      
      module.exports.dsRequestService.on('created', (request) => {
        console.log('About to create request')
        module.exports.requestService.create(request).then(request => {
          console.log('About to create request on DS')
        }).catch(error => {
          console.log('unable to create request on DS', error)
        })
      })

      module.exports.requestService.on('created', (request) => {
        console.log('About to create request')
        module.exports.dsRequestService.create(request).then(request => {
          console.log('About to create request on WS')
        }).catch(error => {
          console.log('unable to create request on WS', error)
        })
      })

      // module.exports.dsRequestService.on('updated', (request) => {
      //   console.log('About to create request')
      //   module.exports.requestService.update(request).then(request => {
      //     console.log('About to create request on DS')
      //   }).catch(error => {
      //     console.log('unable to create request on DS')
      //   })
      // })

      // module.exports.requestService.on('updated', (request) => {
      //   console.log('About to create request')
      //   module.exports.dsRequestService.updated(request).then(request => {
      //     console.log('About to create request on WS')
      //   }).catch(error => {
      //     console.log('unable to create request on WS')
      //   })
      // })

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
        }).catch(err => console.log('web-server add transaction',err))
      })

      module.exports.dsTransactionService.on("removed", (transaction) => {
        module.exports.transactionService.remove(transaction).then((transaction) => {
          console.log('Removed transaction', transaction)
        }).catch(err => console.log('web-server remove transaction',err))
      })
      

      module.exports.dsPendingTransactionService.on("created", (transaction) => {
        module.exports.pendingTransactionService.create(transaction).then((transaction) => {
          console.log('Created transaction', transaction)
        }).catch(err => console.log('web-server add pending transaction',err))
      })

      module.exports.dsPendingTransactionService.on("updated", (transaction) => {
        console.log("Updated Transaction:")
        module.exports.pendingTransactionService.update(transaction._id, transaction).then((transaction) => {
          console.log('Created transaction', transaction)
        }).catch(err => console.log('web-server add pending transaction',err))
      })

      module.exports.dsPendingTransactionService.on("removed", (transaction) => {
        module.exports.pendingTransactionService.remove(transaction).then((transaction) => {
          console.log('Removed transaction', transaction)
        }).catch(err => console.log('web-server remove pending transaction',err))
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
