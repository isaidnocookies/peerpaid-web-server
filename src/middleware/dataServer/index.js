var request = require('superagent');
var jwtdecode = require('jwt-decode');
var config = require('config');

var bitcoin = require('../../lib/bitcoin');

var featherClient = require('../../lib/featherClient');

var debug = require('../../lib/debug');
var queue = require('../../lib/queue');

var requestService = require('./requestService');
var walletService = require('./walletService');
var transactionService = require('./transactionService');
var pendingTransactionService = require('./pendingTransactionService');

var dataServer = featherClient.socketio(config.get('dataServer'));

dataServer.io.on('connected', (socket) => {
  debug('WTF Connected:', socket);
});
dataServer.io.on('disconnected', (socket) => {
  debug('WTF Disconnected:', socket);
});






module.exports = function (app) {

  function init(app) {
    module.exports.requestService = app.service('requests');
    module.exports.walletService = app.service('wallets');
    module.exports.transactionService = app.service('bitcoin-transactions');
    module.exports.pendingTransactionService = app.service('bitcoin-pending-transactions');

    if (!module.exports.transactionService) {
      setTimeout(() => {
        init(app);
      }, 100);
    }
    else {

      module.exports.dataServer = dataServer;

      var loginData = {
        strategy: 'other',
        username: 'webServer',
        password: 'MyPassword'
      };

      var refreshToken = () => {
        module.exports.dataServer.logout().then(result => {
          module.exports.dataServer.authenticate(loginData).then(response => {
            var jwtData = jwtdecode(response.accessToken);
            var exp = new Date(jwtData.exp * 1000);
            exp.setSeconds(exp.getSeconds() - 20);
            var msExp = exp.getTime() - Date.now();
            if (msExp < 1) msExp = 1;
            setTimeout(refreshToken, msExp);
          }).catch(error => {
            debug('Error Authorizing:', error);
          });
        }).catch(err => {
          debug('Unable to logout');
        });
      };



      module.exports.dataServer.authenticate(loginData).then(response => {
        var jwtData = jwtdecode(response.accessToken);
        var exp = new Date(jwtData.exp * 1000);
        exp.setSeconds(exp.getSeconds() - 20);
        var msExp = exp.getTime() - Date.now();
        if (msExp < 1) msExp = 1;
        setTimeout(refreshToken, msExp);
      }).catch(function (error) {
        debug('Error authenticating!', error);
      });


      module.exports.dsRequestService = module.exports.dataServer.service('requests');
      module.exports.dsWalletService = module.exports.dataServer.service('wallets');
      module.exports.dsTransactionService = module.exports.dataServer.service('bitcoin-transactions');
      module.exports.dsPendingTransactionService = module.exports.dataServer.service('bitcoin-pending-transactions');

      requestService(app, module.exports.requestService, module.exports.dsRequestService);
      walletService(app, module.exports.walletService, module.exports.dsWalletService);
      transactionService(app, module.exports.transactionService, module.exports.dsTransactionService);
      pendingTransactionService(app, module.exports.pendingTransactionService, module.exports.dsPendingTransactionService);


      setInterval(() => {
        performUpdate(app);
      }, 10000);
    }
  }

  setTimeout(() => {
    init(app);
  }, 100);
};


function performUpdate(app) {


}
