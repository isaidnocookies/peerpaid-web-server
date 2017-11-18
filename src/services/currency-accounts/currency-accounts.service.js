// Initializes the `currency_accounts` service on path `/currency-accounts`
const createService = require('feathers-mongoose');
const createModel = require('../../models/currency-accounts.model');
const hooks = require('./currency-accounts.hooks');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'currency-accounts',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/currency-accounts', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('currency-accounts');

  service.hooks(hooks);
};
