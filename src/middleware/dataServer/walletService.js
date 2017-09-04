const debug = require('../../lib/debug');
const queue = require('../../lib/queue');

module.exports = (app, localService, remoteService) => {

  remoteService.on('created', (wallet) => {
    debug('About to create wallet');
    localService.create(wallet).then(wallet => {
      debug('About to create wallet on DS');
    }).catch(error => {
      debug('unable to create wallet on Ds', error);
    });
  });

  remoteService.on('updated', (wallet) => {
    debug('About to create wallet');
    localService.update(wallet._id, wallet).then(wallet => {
      debug('About to create wallet on DS');
    }).catch(error => {
      debug('unable to create wallet on Ds', error);
    });
  });
};