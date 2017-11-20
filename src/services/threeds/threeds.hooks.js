

const createRequest = require('../../hooks/create-request');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [createRequest()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
