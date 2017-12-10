
const featherClient = require('../../lib/featherClient');
const config = require('config');

const errors = require('@feathersjs/errors');

module.exports = {
  before: {
    find: [

    ],
    get: [

    ],
    create: [() => { throw new errors.MethodNotAllowed(); }],
    update: [() => { throw new errors.MethodNotAllowed(); }],
    patch: [() => { throw new errors.MethodNotAllowed(); }],
    remove: [() => { throw new errors.MethodNotAllowed(); }]
  },

  after: {
    create: [

    ],
    find: [],
    get: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
  }
};
 