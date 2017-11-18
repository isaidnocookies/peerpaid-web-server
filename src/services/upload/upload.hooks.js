const { authenticate } = require('@feathersjs/authentication').hooks;
const { restrictToOwner, associateCurrentUser } = require('feathers-authentication-hooks');

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
    find: [...restrict],
    get: [...restrict],
    create: [...attachMe],
    update: [...restrict],
    patch: [...restrict],
    remove: [
      hook => {
        return new Promise((resolve, reject) => {
          if (hook.id && hook.id.match(/[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{8}/)) {
            var query = {
              qquuid: hook.id,
              $select: ['_id']
            };
            hook.app.service('upload').find({ query }).then(result => {
              var upload = getFirstItem(result);
              if (upload) {
                hook.id = upload._id;
                resolve(hook);
              }
              else {
                reject(new Error('Object Not Found'));
              }
            }).catch(reject);
          }
          else {
            resolve(hook);
          }
        });
      },
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
