const assert = require('assert');
const app = require('../../src/app');

describe('\'bitcoinTransactions\' service', () => {
  it('registered the service', () => {
    const service = app.service('bitcoin-transactions');

    assert.ok(service, 'Registered the service');
  });
});
