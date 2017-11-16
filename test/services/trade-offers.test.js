const assert = require('assert');
const app = require('../../src/app');

describe('\'tradeOffers\' service', () => {
  it('registered the service', () => {
    const service = app.service('trade-offers');

    assert.ok(service, 'Registered the service');
  });
});
