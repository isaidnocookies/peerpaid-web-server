// Initializes the `trader-profile` service on path `/trader-profile`
const createService = require('./trader-profile.class.js');
const hooks = require('./trader-profile.hooks');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'trader-profile',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/trader-profile', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('trader-profile');

  service.hooks(hooks);
};
