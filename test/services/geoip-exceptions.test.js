const assert = require('assert');
const app = require('../../src/app');

describe('\'geoip-exceptions\' service', () => {
  it('registered the service', () => {
    const service = app.service('geoip-exceptions');

    assert.ok(service, 'Registered the service');
  });
});
