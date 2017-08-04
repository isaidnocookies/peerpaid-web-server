// Initializes the `btcWallets` service on path `/btc-wallets`
const createService = require('./btc-wallets.class.js');
const hooks = require('./btc-wallets.hooks');
const filters = require('./btc-wallets.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'btc-wallets',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/btc-wallets', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('btc-wallets');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
