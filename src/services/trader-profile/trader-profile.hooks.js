
const featherClient = require('../../lib/featherClient');
const config = require('config');

module.exports = {
  before: {
    find: [
      attachDataServer
    ],
    get: [
      attachDataServer
    ],
  },

  after: {
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

