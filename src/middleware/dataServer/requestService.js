const debug = require('../../lib/debug');
const serviceRelayCap = require('../../lib/serviceRelayCap');



module.exports = (app, localService, remoteService) => {
  function serverUpdate(request) {
    // if (request.token === 'WEB') {

    //   switch (request.request) {
    //     case 'REQUEST_BITCOIN_WALLET':
    //     case 'GET_BITCOIN_WALLET':
    //       if (!request.webServerCantResolve) {
    //         localService.update(request._id, {
    //           $set: {
    //             webServerCantResolve: true,
    //             webServerDidResolve: false,
    //             token: 'DATA',
    //             updatedAt: Date.now()
    //           }
    //         }).then((request) => {
    //         }).catch(error => debug('Error updating request', error));
    //       }
    //       break;
    //     default:
    //       break;
    //   }
    // }
  }

  serviceRelayCap(app, localService, remoteService, (element) => {
    serverUpdate(element);
  });



};