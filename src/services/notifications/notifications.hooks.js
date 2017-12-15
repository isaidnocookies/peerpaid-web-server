const { authenticate } = require('@feathersjs/authentication').hooks;
const { restrictToOwner, associateCurrentUser } = require('feathers-authentication-hooks');
const commonHooks = require('feathers-hooks-common');
const errors = require('@feathersjs/errors');

const debug = require('../../lib/debug');

const { getFirstItem } = require('../../lib/common');

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
      restrictToUndeleted
    ],
    get: [],
    create: [...attachMe],
    update: [() => { throw new errors.MethodNotAllowed(); }],
    patch: [
      (hook) => {
        if (hook.data && (hook.data.$set.viewed || hook.data.$set.deleted)) {
          return hook;
        } else {
          throw new errors.MethodNotAllowed();
        }
      }
    ],
    remove: [
      markDeleted
    ]
  },

  after: {
    all: [
      commonHooks.iff(
        hook => hook.method === 'get' && hook.result && hook.result.deleted,
        hook => {
          throw new errors.NotFound(`No record found for id '${hook.id}'`);
        }
      ),
      commonHooks.when(
        hook => hook.params.provider,
        commonHooks.discard('deleted'),
      ),
    ],
    find: [],
    get: [


    ],
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


function restrictToUndeleted(hook) {
  if (hook.params.provider) {
    hook.params.query['deleted'] = { $in: [null, false] };
  }
  return hook;
}

function markDeleted(hook) {
  return new Promise((resolve, reject) => {
    // var smallHook = Object.assign({}, hook, { params: Object.assign({}, hook.params, { user: null, payload: null }) });

    // debug("Hook", smallHook);

    hook.app.service('notifications').patch(hook.id, { $set: { 'deleted': true } }, { query: hook.params.query }).then(notificationResults => {
      var notification = getFirstItem(notificationResults);

      hook.result = notification || {};
      // debug('Hook.result:', hook.result);
      resolve(hook);
    }).catch(error => {
      debug('Error:', error);
      hook.result = {};
      resolve(hook);
    });
  });
}