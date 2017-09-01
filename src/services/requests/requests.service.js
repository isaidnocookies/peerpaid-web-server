// Initializes the `requests` service on path `/requests`
const createService = require('feathers-mongoose');
const createModel = require('../../models/requests.model');
const hooks = require('./requests.hooks');
const filters = require('./requests.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'requests',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/requests', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('requests');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
