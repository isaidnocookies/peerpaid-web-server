const assert = require('assert');
const app = require('../../src/app');

describe('\'trader-profile\' service', () => {
  it('registered the service', () => {
    const service = app.service('trader-profile');

    assert.ok(service, 'Registered the service');
  });
});
