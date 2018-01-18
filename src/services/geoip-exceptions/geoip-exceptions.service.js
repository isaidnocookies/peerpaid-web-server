// Initializes the `geoip-exceptions` service on path `/geoip-exceptions`
const createService = require('feathers-mongoose');
const createModel = require('../../models/geoip-exceptions.model');
const hooks = require('./geoip-exceptions.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'geoip-exceptions',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/geoip-exceptions', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('geoip-exceptions');

  service.hooks(hooks);
};
