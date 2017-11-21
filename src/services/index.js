const users = require('./users/users.service.js');
const bitcoinTransactions = require('./bitcoin-transactions/bitcoin-transactions.service.js');
const wallets = require('./wallets/wallets.service.js');
const requests = require('./requests/requests.service.js');
const currencyAccounts = require('./currency-accounts/currency-accounts.service.js');
const queueBank = require('./queue-bank/queue-bank.service.js');
const paymentMethods = require('./payment-methods/payment-methods.service.js');
const enums = require('./enums/enums.service.js');
const tradeOffers = require('./trade-offers/trade-offers.service.js');

const commandProxy = require('./command-proxy/command-proxy.service.js');

const traderProfile = require('./trader-profile/trader-profile.service.js');


const upload = require('./upload/upload.service.js');

module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(bitcoinTransactions);
  app.configure(wallets);
  app.configure(requests);
  app.configure(currencyAccounts);
  app.configure(queueBank);
  app.configure(paymentMethods);
  app.configure(enums);
  app.configure(tradeOffers);
  app.configure(commandProxy);
  app.configure(traderProfile);
  app.configure(upload);
};
