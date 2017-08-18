/* eslint-disable no-unused-vars */
const featherClient = require('../../lib/featherClient');

class Service {
  constructor(options) {
    this.options = options || {};
  }

  find(params) {
    return params.dataServer.service('users').find(params.query);
  }

  get(id, params) {
    return params.dataServer.service('users').get(id); //, params);
  }

  create(data, params) {
    return params.dataServer.service('users').create(data);//, params);
  }

  update(id, data, params) {
    return params.dataServer.service('users').update(id, data);//, params);
  }

  patch(id, data, params) {
    return params.dataServer.service('users').patch(id, data);//, params);
  }

  remove(id, params) {
    return params.dataServer.service('users').remove(id);
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
