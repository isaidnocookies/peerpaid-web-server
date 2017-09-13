// Initializes the `bitcoinTransactions_proccessed` service on path `/bitcoin-transactions-proccessed`
const createService = require('feathers-mongoose');
const createModel = require('../../models/bitcoin-transactions-proccessed.model');
const hooks = require('./bitcoin-transactions-proccessed.hooks');
const filters = require('./bitcoin-transactions-proccessed.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'bitcoin-transactions-proccessed',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/bitcoin-transactions-proccessed', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('bitcoin-transactions-proccessed');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
