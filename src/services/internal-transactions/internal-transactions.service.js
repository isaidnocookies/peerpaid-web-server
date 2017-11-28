const createService = require('./internal-transactions.class.js');
const hooks = require('./internal-transactions.hooks');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'internal-transaction',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/internal-transaction', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('internal-transaction');

  service.hooks(hooks);
};
