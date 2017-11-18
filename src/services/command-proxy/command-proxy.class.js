/* eslint-disable no-unused-vars */
var dataServer = require('../../lib/feathersDataServerClient');

var errors = require('@feathersjs/errors');

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

    if (data.action === 'resetPwdLong') {
      return dataServer.service('authManagement').create(data);
    }

    else if (data.action === 'sendResetPwd') {
      data.notifierOptions = {
        preferredComm: 'emailAddress'
      };
      console.log(data);
      return dataServer.service('authManagement').create(data);
    }


    else {
      return Promise.reject(new errors.BadRequest('Command cannot be performed'))
    }
  }


  update(id, data, params) {
    console.log("Data:", data);
    console.log("params:", params);
    // if (data.action === 'sendResetPwd') {
    //   return dataServer.service('authManagement').update(data);
    // }
  }
}


module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
