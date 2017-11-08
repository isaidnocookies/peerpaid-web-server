/* eslint-disable no-unused-vars */
const featherClient = require('../../lib/featherClient');

class Service {
  constructor(options) {
    this.options = options || {};
  }

  find(params) {
    console.log("Server params within trader-profile.class" , JSON.stringify(params.query,null,2));
    return params.dataServer.service('trader-profile').find(params);
  }

}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
