const assert = require('assert');
const app = require('../../src/app');

describe('\'queueBank\' service', () => {
  it('registered the service', () => {
    const service = app.service('queue-bank');

    assert.ok(service, 'Registered the service');
  });
});
