const { authenticate } = require('@feathersjs/authentication').hooks;
const Errors = require('@feathersjs/errors');
const commonHooks = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [
      commonHooks.iff(hook => {
        return !['get','find'].some((element) => {return element === hook.method;});
      }, [
        authenticate('jwt'),
        hook => {
          if (!hook.params.provider || (hook.params.user.permissions && hook.params.user.permissions.isAdmin)) {
            return hook;
          }
          block(hook);
        }
      ])
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [

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

function block() {
  throw new Errors.Forbidden('Operation not allowed');
}
