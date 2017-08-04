'use strict';

const users = require('./users/users.service.js');
const btcWallets = require('./btc-wallets/btc-wallets.service.js');

//const recipes = require('./recipes/recipes.service.js');

module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(btcWallets);
};
