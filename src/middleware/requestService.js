


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
            case 'REQUEST_SEND_BITCOINS':
            case 'REQUEST_BITCOIN_WALLET':
            case 'GET_BITCOIN_WALLET':
              switch (request.stage) {
                case void 0: // Undefined (Start)
                  requestService.update(request._id, {
                    $set: {
                      token: 'DATA',
                      updatedAt: Date.now()
                    }
                  }).then((request) => {
                  }).catch(error => debug('Error updating request', error));
                  break; // case request.stage
                default:
                  console.log("Unhandled stage :", request.stage);
                  // should not make it here
                  break; // case request.stage
              }
              break;
            default:
              console.log("Unhandled request:", request.request);
              break;// case request.request
          }
        }
      }

      requestService.on("created", (request) => {
        requestUpdated(request);
      });
      requestService.on("updated", (request) => {
        requestUpdated(request);
      });
      requestService.on("patched", (request) => {
        requestUpdated(request);
      });

    }
  }
  init(app);
}