// Initializes the `threeds` service on path `/threeds`
const createService = require('feathers-memory');
const hooks = require('./threeds.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    name: 'threeds',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/threeds', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('threeds');

  service.hooks(hooks);
};
