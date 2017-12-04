
const featherClient = require('../../lib/featherClient');
const config = require('config');

module.exports = {
  before: {
    create:[
      attachDataServer
    ],
    find: [
      attachDataServer
    ],
    get: [
      attachDataServer
    ],
  },

  after: {
    create:[
      attachDataServer
    ],
    find: [],
    get: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
  }
};

function attachDataServer(hook) {
  var payload = (hook.params && hook.params.payload) || hook.payload || {};
  var accessToken = payload.accessToken;

  hook.params = Object.assign(hook.params || {}, { dataServer: featherClient(config.get('dataServer'), accessToken) }, {});
  return hook;

}

