// Application hooks that run for every service
const logger = require('./hooks/logger');
const hooks = require('feathers-hooks-common');
module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [
      hooks.iff(hook => { hook.path !== 'queue-bank'; },
        logger()
      )
    ],
    find: [],
    get: [],
    create: [
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [logger()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
