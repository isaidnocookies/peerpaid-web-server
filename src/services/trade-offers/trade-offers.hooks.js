const { authenticate } = require('@feathersjs/authentication').hooks;
const { restrictToOwner, associateCurrentUser } = require('feathers-authentication-hooks');
const featherClient = require('../../lib/featherClient');
const config = require('config');

const errors = require('@feathersjs/errors');

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
 