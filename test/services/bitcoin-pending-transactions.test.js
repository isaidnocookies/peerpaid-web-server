const assert = require('assert');
const app = require('../../src/app');

describe('\'bitcoinPendingTransactions\' service', () => {
  it('registered the service', () => {
    const service = app.service('bitcoin-pending-transactions');

    assert.ok(service, 'Registered the service');
  });
});
