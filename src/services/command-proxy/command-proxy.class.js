/* eslint-disable no-unused-vars */
var dataServer = require('../../lib/feathersDataServerClient');

var errors = require('@feathersjs/errors');

var debug = require('../../lib/debug');

class Service {
  constructor(options) {
    this.options = options || {};
  }

  create(data, params) {
    debug('Data:', data);
    debug('params:', params);

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
      // debug(data);
      return dataServer.service('authManagement').create(data);
    }

    else if (data.action === 'resendVerifySignup') {
      data.notifierOptions = {
        preferredComm: 'emailAddress'
      };
      // debug('resendVerifySignup data: ', data);
      return dataServer.service('authManagement').create(data);
    }


    else {
      return Promise.reject(new errors.BadRequest('Command cannot be performed'));
    }
  }


  // update(id, data, params) {
  //   debug("Data:", data);
  //   debug("params:", params);
  //   // if (data.action === 'sendResetPwd') {
  //   //   return dataServer.service('authManagement').update(data);
  //   // }
  // }
}


module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
