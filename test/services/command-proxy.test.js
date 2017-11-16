const assert = require('assert');
const app = require('../../src/app');

describe('\'commandProxy\' service', () => {
  it('registered the service', () => {
    const service = app.service('command-proxy');

    assert.ok(service, 'Registered the service');
  });
});
