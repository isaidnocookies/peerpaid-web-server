const { authenticate } = require('@feathersjs/authentication').hooks;
const { restrictToOwner, associateCurrentUser } = require('feathers-authentication-hooks');

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
      ...attachMe
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
