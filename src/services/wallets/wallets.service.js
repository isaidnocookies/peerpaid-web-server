// Initializes the `wallets` service on path `/wallets`
const createService = require('feathers-mongoose');
const createModel = require('../../models/wallets.model');
const hooks = require('./wallets.hooks');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'wallets',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/wallets', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('wallets');

  service.hooks(hooks);
};
