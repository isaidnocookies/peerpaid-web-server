/* eslint-disable no-unused-vars */

const debug = require('../../lib/debug');
const featherClient = require('../../lib/featherClient');

class Service {
  constructor(options) {
    this.options = options || {};
  }

  find(params) {
    debug('Server internal-transactions.class' , JSON.stringify(params.query,null,2));
    return params.dataServer.service('internal-transaction').find(params);
  }
  get(id,params) {
    return params.dataServer.service('internal-transaction').get(id);
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
