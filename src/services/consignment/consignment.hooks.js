const { authenticate } = require('@feathersjs/authentication').hooks;
const { restrictToOwner, associateCurrentUser } = require('feathers-authentication-hooks');
const featherClient = require('../../lib/featherClient');
const config = require('config');

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
    find: [attachDataServer],
    get: [],
    create: [...attachMe, attachDataServer],
    update: [...restrict],
    patch: [...restrict],
    remove: []
  },

  after: {
    all: [],
    find: [attachDataServer],
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

function attachDataServer(hook) {
  var payload = (hook.params && hook.params.payload) || hook.payload || {};
  var accessToken = payload.accessToken;

  hook.params = Object.assign(hook.params || {}, { dataServer: featherClient(config.get('dataServer'), accessToken) }, {});
  return hook;
}
