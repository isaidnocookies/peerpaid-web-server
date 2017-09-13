const debug = require('../../lib/debug');
const queue = require('../../lib/queue');

const serviceRelayCap = require('../../lib/serviceRelayCap');

module.exports = (app, localService, remoteService) => {
  function serverUpdate(element){

  }

  serviceRelayCap(app, localService, remoteService, (element) => {
    serverUpdate(element);
  });

};