// Initializes the `trader-profile` service on path `/trader-profile`
const createService = require('feathers-mongoose');
const createModel = require('../../models/trader-profile.model');
const hooks = require('./trader-profile.hooks');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'trader-profile',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/trader-profile', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('trader-profile');

  service.hooks(hooks);
};
