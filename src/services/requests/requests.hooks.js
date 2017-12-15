const { authenticate } = require('@feathersjs/authentication').hooks;
const { restrictToOwner, associateCurrentUser } = require('feathers-authentication-hooks');
const crypt = require('../../lib/crypt');

const restrict = [
  authenticate('jwt'),
  restrictToOwner({
    idField: '_id',
    ownerField: 'owner'
  })
];

const attachMe = [
  authenticate('jwt'),
  associateCurrentUser({
    idField: '_id',
    as: 'owner'
  })
];

const encryptPayloadForServers = (hook) => {
  if (hook.data && hook.data.payload) {
    if (hook.data.payload.fiat && !hook.data.payload.fiat.encrypted) {
      hook.data.payload.fiat = {
        encrypted: crypt.encryptForFiatServer(JSON.stringify(hook.data.payload.fiat))
      };
    }
    if (hook.data.payload.btc && !hook.data.payload.btc.encrypted) {
      hook.data.payload.btc = {
        encrypted: crypt.encryptForBitcoinServer(JSON.stringify(hook.data.payload.btc))
      };
    }
    if (hook.data.payload.data && !hook.data.payload.data.encrypted) {
      hook.data.payload.data = {
        encrypted: crypt.encryptForBitcoinServer(JSON.stringify(hook.data.payload.data))
      };
    }
  }
  return hook;
};

module.exports = {
  before: {
    all: [authenticate('jwt'),
      // hook => {
      //   if (hook.data && hook.data.payload && typeof hook.data.payload !== 'function') {
      //     hook.data.payload = JSON.stringify(hook.data.payload);
      //   }
      //   return Promise.resolve(hook);
      // }
    ],
    find: [],
    get: [
      ...restrict
    ],
    create: [
      ...attachMe,
      encryptPayloadForServers
    ],
    update: [
      ...restrict
    ],
    patch: [
      ...restrict
    ],
    remove: [
      ...restrict
    ]
  },

  after: {
    all: [],
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
