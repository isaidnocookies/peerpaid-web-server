const assert = require('assert');
const app = require('../../src/app');

describe('\'liveData\' service', () => {
  it('registered the service', () => {
    const service = app.service('live-data');

    assert.ok(service, 'Registered the service');
  });
});
