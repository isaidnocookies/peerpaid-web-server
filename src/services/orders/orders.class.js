/* eslint-disable no-unused-vars */
const featherClient = require('../../lib/featherClient');

class Service {
  constructor(options) {
    this.options = options || {};
  }

  get(id, params) {
    return params.dataServer.service('order').get(id); //, params);
  }


  create(data, params) {
    return params.dataServer.service('order').create(data, params);
  }

}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;


