/* eslint-disable no-unused-vars */
var dataServer = require('../../lib/feathersDataServerClient');

var errors = require('feathers-errors');

class Service {
  constructor(options) {
    this.options = options || {};
  }

  create(data, params) {
    console.log("Data:", data);
    console.log("params:", params);

    if (data.action === 'verifySignupLong') {
      return dataServer.service('authManagement').create(data);
    }
    else {
      return Promise.reject(new errors.BadRequest('Command cannot be performed'))
    }
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
