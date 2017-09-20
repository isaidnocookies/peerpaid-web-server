const { authenticate } = require('feathers-authentication').hooks;
const hooks = require('feathers-hooks-common');
const errors = require('feathers-errors');
const uuid = require('uuid');

const updateGuid = () => {
  return hooks.iffElse(
    (hook) => !hooks.existsByDot(hook, 'data.updateGuid'),
    (hook) => {
      try {
        hooks.setByDot(hook, 'data.updateGuid', uuid());
        return hook;
      }
      catch (err) {
        debug('UpdateGuid Error:', err);
        return err;
      }
    },
    (hook) => { return hook; }
  );
};

module.exports = {
  before: {
    all: [
      hooks.iff(hooks.isProvider('external'),
        hook => {
          return Promise.reject(new errors.NotFound('Page not found'));
        }
      )
    ],
    find: [],
    get: [],
    create: [],
    update: [
      updateGuid()
    ],
    patch: [
      updateGuid()
    ],
    remove: []
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


