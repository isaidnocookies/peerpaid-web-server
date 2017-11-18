// Initializes the `commandProxy` service on path `/command-proxy`
const createService = require('./command-proxy.class.js');
const hooks = require('./command-proxy.hooks');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'command-proxy',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/command-proxy', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('command-proxy');

  service.hooks(hooks);
};
