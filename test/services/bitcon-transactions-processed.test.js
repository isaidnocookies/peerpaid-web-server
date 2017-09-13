const assert = require('assert');
const app = require('../../src/app');

describe('\'bitconTransactions_processed\' service', () => {
  it('registered the service', () => {
    const service = app.service('bitcon-transactions-processed');

    assert.ok(service, 'Registered the service');
  });
});
