const featherClient = require('../../lib/featherClient');
const config = require('config');

const { authenticate } = require('@feathersjs/authentication').hooks;
const { restrictToOwner } = require('feathers-authentication-hooks');

const errors = require('@feathersjs/errors');


const restrict = [
  authenticate('jwt'),
  restrictToOwner({
    idField: '_id',
    ownerField: 'owner'
  })
];

module.exports = {
  before: {
    all: [
      ...restrict
    ],
    find: [],
    get: [],
    create: [() => { throw new errors.MethodNotAllowed(); }],
    update: [() => { throw new errors.MethodNotAllowed(); }],
    patch: [() => { throw new errors.MethodNotAllowed(); }],
    remove: [() => { throw new errors.MethodNotAllowed(); }]
  },

  after: {
    find: [],
    get: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
  }
};