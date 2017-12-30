var requestService = require('./requestService');

const commandParser = require('./command-parser');
const subscribe = require('./subscribe');
const threeds = require('./threeds');






module.exports = function () {
  // Add your custom middleware here. Remember, that
  // in Express the order matters
  const app = this; // eslint-disable-line no-unused-vars
  requestService(app);
  
  app.use('/command', commandParser({ app }));
  app.use('/subscribe', subscribe());
  app.post('/threeds', threeds({app}));
};
