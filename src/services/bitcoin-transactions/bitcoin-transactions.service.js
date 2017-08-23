// Initializes the `bitcoinTransactions` service on path `/bitcoin-transactions`
const createService = require('feathers-mongoose');
const createModel = require('../../models/bitcoin-transactions.model');
const hooks = require('./bitcoin-transactions.hooks');
const filters = require('./bitcoin-transactions.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'bitcoin-transactions',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/bitcoin-transactions', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('bitcoin-transactions');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
