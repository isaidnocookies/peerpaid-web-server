const createService = require('./orders.class.js');
const hooks = require('./orders.hooks');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'order',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/order', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('order');

  service.hooks(hooks);
};
