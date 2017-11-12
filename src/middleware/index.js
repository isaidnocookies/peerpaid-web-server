var dataServer = require('./dataServer');
var queue = require('./queue');
var requestService = require('./requestService');

const commandParser = require('./command-parser');


module.exports = function () {
  // Add your custom middleware here. Remember, that
  // in Express the order matters
  const app = this; // eslint-disable-line no-unused-vars
  // dataServer(app);
  // queue(app);
  requestService(app);
  app.use('/command', commandParser({app}));
};
