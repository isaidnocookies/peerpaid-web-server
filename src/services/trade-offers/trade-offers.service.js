// Initializes the `trade-offer` service on path `/trade-offer`
const createService = require('feathers-mongoose');
const createModel = require('../../models/trade-offers.model');
const hooks = require('./trade-offers.hooks');


module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'trade-offers',
    Model,
    paginate
  };


  // Initialize our service with any options it requires
  app.use('/trade-offers', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('trade-offers');

  service.hooks(hooks);
};

