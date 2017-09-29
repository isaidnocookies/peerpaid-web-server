const users = require('./users/users.service.js');
const bitcoinTransactions = require('./bitcoin-transactions/bitcoin-transactions.service.js');
const wallets = require('./wallets/wallets.service.js');
const requests = require('./requests/requests.service.js');
const currencyAccounts = require('./currency-accounts/currency-accounts.service.js');
const queueBank = require('./queue-bank/queue-bank.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(bitcoinTransactions);
  app.configure(wallets);
  app.configure(requests);
  app.configure(currencyAccounts);
  app.configure(queueBank);
};
