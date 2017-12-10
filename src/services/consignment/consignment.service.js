// Initializes the `consignment` service on path `/consignment`
const createService = require('feathers-mongoose');
const createModel = require('../../models/consignment.model');
const hooks = require('./consignment.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'consignment',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/consignment', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('consignment');
  
  service.hooks(hooks);
};
