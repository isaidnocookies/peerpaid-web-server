const debug = require('../../lib/debug');
const queue = require('../../lib/queue');

module.exports = (app, localService, remoteService) => {

  remoteService.on('created', (transaction) => {
    localService.create(transaction).then((transaction) => {
      debug('Created transaction', transaction);
    }).catch(err => debug('web-server add transaction', err));
  });

  remoteService.on('removed', (transaction) => {
    localService.remove(transaction).then((transaction) => {
      debug('Removed transaction', transaction);
    }).catch(err => debug('web-server remove transaction', err));
  });


};