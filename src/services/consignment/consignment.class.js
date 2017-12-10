

/* eslint-disable no-unused-vars */
const featherClient = require('../../lib/featherClient');
var dataServer = require('../../lib/feathersDataServerClient');

class Service {
  constructor(options) {
    this.options = options || {};
  }

  find(params) {
    console.log("Server params within consignment.class", JSON.stringify(params.query, null, 2));
    return dataServer.service('consignment').find(params);
  }
  get(id, params) {
    return dataServer.service('consignment').get(id); //, params);
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;