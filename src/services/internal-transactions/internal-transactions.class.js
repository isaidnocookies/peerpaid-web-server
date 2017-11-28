/* eslint-disable no-unused-vars */
const featherClient = require('../../lib/featherClient');

class Service {
  constructor(options) {
    this.options = options || {};
  }

  find(params) {
    console.log("Server internal-transactions.class" , JSON.stringify(params.query,null,2));
    return params.dataServer.service('internal-transaction').find(params);
  }


}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
