// Initializes the `liveData` service on path `/live-data`
const createService = require('feathers-mongoose');
const createModel = require('../../models/live-data.model');
const hooks = require('./live-data.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'live-data',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/live-data', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('live-data');

  service.hooks(hooks);
};
