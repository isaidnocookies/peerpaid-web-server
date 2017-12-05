/* eslint-disable no-unused-vars */
const featherClient = require('../../lib/featherClient');

class Service {
  constructor(options) {
    this.options = options || {};
  }

  find(params) {
    console.log("Server params within consignment.class" , JSON.stringify(params.query,null,2));
    return params.dataServer.service('consignment').find(params);
  }

}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
