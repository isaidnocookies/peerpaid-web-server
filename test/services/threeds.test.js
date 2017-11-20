const assert = require('assert');
const app = require('../../src/app');

describe('\'threeds\' service', () => {
  it('registered the service', () => {
    const service = app.service('threeds');

    assert.ok(service, 'Registered the service');
  });
});
