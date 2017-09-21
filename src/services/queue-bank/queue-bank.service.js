// Initializes the `queueBank` service on path `/queue-bank`
const createService = require('feathers-mongoose');
const createModel = require('../../models/queue-bank.model');
const hooks = require('./queue-bank.hooks');
const filters = require('./queue-bank.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'queue-bank',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/queue-bank', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('queue-bank');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
