const { authenticate } = require('@feathersjs/authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { populate } = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');

const config = require('config');

const debug = require('../../lib/debug');

const featherClient = require('../../lib/featherClient');

const restrict = [
  authenticate('jwt'),
  restrictToOwner({
    idField: '_id',
    ownerField: '_id'
  })
];

const walletSchema = {
  include: {
    service: 'wallets',
    nameAs: 'bitcoinWallets',
    parentField: 'bitcoinWallets',
    childField: '_id',
    asArray: true,
  }
};

module.exports = {
  before: {
    all: [
      hook => {
        if (hook.params.provider === 'relay') {
          hook.result = hook.params.relayData;
          return hook;
        }
        return hook;
      }
    ],
    find: [
      authenticate('jwt'),
      attachDataServer
    ],
    get: [
      ...restrict,
      attachDataServer,
    ],
    create: [
      attachDataServer,
    ],
    update: [
      ...restrict,
      attachDataServer,
    ],
    patch: [
      ...restrict,
      attachDataServer,
    ],
    remove: [
      ...restrict,
      attachDataServer
    ]
  },

  after: {
    all: [
      commonHooks.when(
        hook => hook.params.provider,
        commonHooks.discard('password'),
      ),
      commonHooks.iff(
        hook => {
          return hook.method !== 'create';
        },
        populate({ schema: walletSchema })
      )

    ],
    find: [],
    get: [],
    create: [],
    update: [checkForNotify],
    patch: [checkForNotify],
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

function checkForNotify(hook) {
  return new Promise((resolve, reject) => {
    if (hook.params && hook.params.user && !hook.params.user.suppressUserUpdateNotice) {
      hook.app.service('notification').create({}).then(result => {
        debug('User was notified about the update');
        resolve(hook);
      }).catch(error => {
        debug('checkForNotify Error:', error);
        reject(error);
      });
    }
  });
}