const users = require('./users/users.service.js');
const bitcoinTransactions = require('./bitcoin-transactions/bitcoin-transactions.service.js');
const bitcoinPendingTransactions = require('./bitcoin-pending-transactions/bitcoin-pending-transactions.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(bitcoinTransactions);
  app.configure(bitcoinPendingTransactions);
};
