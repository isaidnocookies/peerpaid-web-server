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
var currency_accountService = require('./currency_accountService');
var processedTransactionService = require('./bitcoinTransactionsProcessedService');

var dataServer = require('../../lib/feathersDataServerClient');

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
    module.exports.currency_accountService = app.service('currency-accounts');
    module.exports.processedTransactionService = app.service('bitcoin-transactions-proccessed');
    
    if (!module.exports.transactionService) {
      setTimeout(() => {
        init(app);
      }, 100);
    }
    else {

      module.exports.dataServer = dataServer;


      module.exports.dsRequestService = module.exports.dataServer.service('requests');
      module.exports.dsWalletService = module.exports.dataServer.service('wallets');
      module.exports.dsTransactionService = module.exports.dataServer.service('bitcoin-transactions');
      module.exports.dsPendingTransactionService = module.exports.dataServer.service('bitcoin-pending-transactions');
      module.exports.dsCurrency_accountService = module.exports.dataServer.service('currency-accounts');
      module.exports.dsProcessedTransactionService = module.exports.dataServer.service('bitcoin-transactions-proccessed');
      
      requestService(app, module.exports.requestService, module.exports.dsRequestService);
      walletService(app, module.exports.walletService, module.exports.dsWalletService);
      transactionService(app, module.exports.transactionService, module.exports.dsTransactionService);
      pendingTransactionService(app, module.exports.pendingTransactionService, module.exports.dsPendingTransactionService);
      currency_accountService(app, module.exports.currency_accountService, module.exports.dsCurrency_accountService);
      processedTransactionService(app, module.exports.processedTransactionService, module.exports.dsProcessedTransactionService );
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
