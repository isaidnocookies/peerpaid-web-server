


module.exports = function (app) {

  function init(app) {
    var requestService = app.service('requests');
    if (!requestService) {
      setTimeout(() => {
        init(app);
      }, 100);
    }
    else {
      function requestUpdated(request) {

        if (request.token === 'WEB') {

          switch (request.request) {
            case 'REQUEST_BITCOIN_WALLET':
            case 'GET_BITCOIN_WALLET':
              if (!request.webServerCantResolve) {
                requestService.update(request._id, {
                  $set: {
                    webServerCantResolve: true,
                    webServerDidResolve: false,
                    token: 'DATA',
                    updatedAt: Date.now()
                  }
                }).then((request) => {
                }).catch(error => debug('Error updating request', error));
              }
              break;
            default:
              break;
          }
        }
      }

      requestService.on("created",(request) => {
        requestUpdated(request);
      });
      requestService.on("updated",(request) => {
        requestUpdated(request);
      });
      requestService.on("patched",(request) => {
        requestUpdated(request);
      });
      
    }
  }
  init(app);
}