const { authenticate } = require('@feathersjs/authentication').hooks;
const { restrictToOwner, associateCurrentUser } = require('feathers-authentication-hooks');

// const feathersError = require('feathers-errors');

// const { getFirstItem } = require('../../lib/common');

// const debug = require('../../lib/debug');

const { markDeleted } = require('../../hooks/markDeleted');
const { restrictToUndeleted } = require('../../hooks/restrictToUndeleted');
const { CreateNotification } = require('../../hooks/CreateNotification');

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
    all: [authenticate('jwt')],
    find: [
      ...restrict,
      restrictToUndeleted
    ],
    get: [...restrict],
    create: [...attachMe],
    update: [...restrict],
    patch: [...restrict],
    remove: [
      ...restrict,
      markDeleted({ serviceName: 'upload' })
    ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      CreateNotification({
        notifyType: 'Upload',
        notifyMessage: (hook) => {
          let payloadKey = hook.data.fileName;
          console.log('created notification');
          return `Document uploaded: ${payloadKey}`;
        },
        infoLink: '/profile/profile-data',
      })
    ],
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