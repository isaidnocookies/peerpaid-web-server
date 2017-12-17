const { authenticate } = require('@feathersjs/authentication').hooks;
const { restrictToOwner, associateCurrentUser } = require('feathers-authentication-hooks');

const feathersError = require('feathers-errors');

const { getFirstItem } = require('../../lib/common');

const debug = require('../../lib/debug');

const {markDeleted} = require('../../hooks/markDeleted');

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
    find: [...restrict],
    get: [...restrict],
    create: [...attachMe],
    update: [...restrict],
    patch: [...restrict],
    remove: [
      ...restrict,
      markDeleted({serviceName: 'upload'})
    ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      createNotification
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

function createNotification(hook) {
  // console.log('upload create hook data', hook.data);
  if (hook.data) {
    // let payloadKey = Object.keys(hook.data.$set).slice(0, 1);
    let payloadKey = hook.data.fileName;
    hook.app.service('notifications').create({
      notifyType: 'Upload',
      notifyMessage: `Document uploaded: ${payloadKey}`,
      infoLink: '/profile/my-documents',
      owner: hook.params.user._id
    }).then(result => {
      // console.log('hook create result:',result);
      return hook;
    }).catch(error => {
      debug('hook create error', error);
      return hook;
    });
    // console.log('user update hook data key', payloadKey);
    // console.log('user update hook params', hook.params.user)
    return hook;
  }
}