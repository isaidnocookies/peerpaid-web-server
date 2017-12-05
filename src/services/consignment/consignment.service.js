// Initializes the `trader-profile` service on path `/trader-profile`
const createService = require('./consignment.class.js');
const hooks = require('./consignment.hooks');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'consignment',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/consignment', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('consignment');

  service.hooks(hooks);
};
