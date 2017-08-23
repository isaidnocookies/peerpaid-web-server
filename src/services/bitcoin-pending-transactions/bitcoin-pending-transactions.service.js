// Initializes the `bitcoinPendingTransactions` service on path `/bitcoin-pending-transactions`
const createService = require('feathers-mongoose');
const createModel = require('../../models/bitcoin-pending-transactions.model');
const hooks = require('./bitcoin-pending-transactions.hooks');
const filters = require('./bitcoin-pending-transactions.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'bitcoin-pending-transactions',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/bitcoin-pending-transactions', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('bitcoin-pending-transactions');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
