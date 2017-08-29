const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');

const config = require('config');

var app;
const featherClient = require('../../lib/featherClient');

const restrict = [
  authenticate('jwt'),
  restrictToOwner({
    idField: '_id',
    ownerField: '_id'
  })
];

setTimeout(() => {
  app = require('../../app');
},100)

module.exports = {
  before: {
    all: [
      hook => {
        if (hook.params.provider === 'relay'){
          hook.result = hook.params.relayData;
          return hook;
        }
        return hook;
      }
    ],
    find: [
      authenticate('jwt'),
      attachDataServer
    ],
    get: [
      ...restrict,
      attachDataServer
    ],
    create: [
      attachDataServer,
    ],
    update: [
      ...restrict,
      attachDataServer
    ],
    patch: [
      ...restrict,
      attachDataServer
    ],
    remove: [
      ...restrict,
      attachDataServer
    ]
  },

  after: {
    all: [
      commonHooks.when(
        hook => hook.params.provider,
        commonHooks.discard('password')
      )
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};


function attachDataServer(hook) {
    var payload = (hook.params && hook.params.payload) || hook.payload || {};

    var accessToken = payload.accessToken;

    hook.params = Object.assign(hook.params || {}, { dataServer: featherClient(config.get('dataServer'), accessToken) }, {});
    return hook;

}
