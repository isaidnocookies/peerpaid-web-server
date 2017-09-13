const assert = require('assert');
const app = require('../../src/app');

describe('\'currency_account\' service', () => {
  it('registered the service', () => {
    const service = app.service('currency-account');

    assert.ok(service, 'Registered the service');
  });
});
