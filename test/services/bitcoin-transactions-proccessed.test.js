const assert = require('assert');
const app = require('../../src/app');

describe('\'bitcoinTransactions_proccessed\' service', () => {
  it('registered the service', () => {
    const service = app.service('bitcoin-transactions-proccessed');

    assert.ok(service, 'Registered the service');
  });
});
