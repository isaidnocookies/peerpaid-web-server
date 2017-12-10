// Initializes the `internal-transaction` service on path `/internal-transaction`
const createService = require('feathers-mongoose');
const createModel = require('../../models/internal-transaction.model');
const hooks = require('./internal-transaction.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'internal-transaction',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/internal-transaction', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('internal-transaction');

  service.hooks(hooks);
};
