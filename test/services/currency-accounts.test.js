const assert = require('assert');
const app = require('../../src/app');

describe('\'currency_accounts\' service', () => {
  it('registered the service', () => {
    const service = app.service('currency-accounts');

    assert.ok(service, 'Registered the service');
  });
});
