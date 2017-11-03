// Initializes the `bitcoinTransactions` service on path `/bitcoin-transactions`
const createService = require('feathers-mongoose');
const createModel = require('../../models/enums.model');
const hooks = require('./enums.hooks');
const filters = require('./enums.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'enums',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/enums', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('enums');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
