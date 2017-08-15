const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');

const config = require('config');
const featherClient = require('../../lib/featherClient');

const restrict = [
  authenticate('jwt'),
  restrictToOwner({
    idField: '_id',
    ownerField: '_id'
  })
];

module.exports = {
  before: {
    all: [
    ],
    find: [
      authenticate('jwt'),
      attachDataServer
    ],
    get: [
      ...restrict,
      attachDataServer
    ],
    create: [],
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
  new Promise((resolve, reject) => {



    var payload = hook.params.payload || hook.payload;

    if (payload) {
      if (payload.accessToken) {
        hook.params.dataServer = featherClient(config.get('dataServer'), payload.accessToken);
        resolve(hook);
      }
      else {
        reject(hook)
      }
    }
    else {
      reject()
    }

  });

}
