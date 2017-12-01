
/* eslint-disable no-unused-vars */
const featherClient = require('../../lib/featherClient');

class Service {
  constructor(options) {
    this.options = options || {};
  }

  create(data, params) {
    console.log("Server params within trade-offer.class", JSON.stringify(params.query, null, 2));
    return params.dataServer.service('trade-offers').create(data, params);
  }
  find(params) {
    console.log("Server params within trade-offers.class", JSON.stringify(params.query, null, 2));
    return params.dataServer.service('trade-offers').find(params);
  }


}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
