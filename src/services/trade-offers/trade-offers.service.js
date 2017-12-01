const createService = require('./trade-offers.class.js');
const hooks = require('./trade-offers.hooks');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'trade-offers',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/trade-offers', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('trade-offers');

  service.hooks(hooks);
};
