const { authenticate } = require('@feathersjs/authentication').hooks;

const errors = require('@feathersjs/errors');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [() => { throw new errors.MethodNotAllowed(); }],
    update: [() => { throw new errors.MethodNotAllowed(); }],
    patch: [() => { throw new errors.MethodNotAllowed(); }],
    remove: [() => { throw new errors.MethodNotAllowed(); }]
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
