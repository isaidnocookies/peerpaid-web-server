const crypt = require('../lib/crypt');
const config = require('config');

const debug = require('../lib/debug');

const SERVER_TITLE = config.get('serverTitle');

const ADMIN_SERVER = config.get('serverTitles.admin');
const BTC_SERVER = config.get('serverTitles.btc');
const DATA_SERVER = config.get('serverTitles.data');
const FIAT_SERVER = config.get('serverTitles.fiat');
const WEB_SERVER = config.get('serverTitles.web');

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

        if (request.token === SERVER_TITLE && SERVER_TITLE === WEB_SERVER) {
          switch (request.request) {
            case 'CREATE_ENCRYPTED_FIAT_PAYLOAD':
            case 'REQUEST_BITCOIN_WALLET':
            case 'GET_BITCOIN_WALLET':
            case 'CREATE_DEPOSIT_ORDER':
              switch (request.stage) {
                case void 0: // Undefined (Start)
                  requestService.update(request._id, {
                    $set: {
                      token: DATA_SERVER,
                      updatedAt: Date.now()
                    }
                  }).then((request) => {
                  }).catch(error => debug('Error updating request', error));
                  break; // case request.stage
                default:
                  debug('Unhandled stage :', request.stage);
                  // should not make it here
                  break; // case request.stage
              }
              break;
            case 'REQUEST_SEND_BITCOINS':
              switch (request.stage) {
                case 'REQUESTED':
                  requestService.update(request._id, {
                    $set: {
                      token: DATA_SERVER,
                      updatedAt: Date.now()
                    }
                  }).then((request) => {
                  }).catch(error => debug('Error updating request', error));
                  break; // case request.stage
                default:
                  debug('Unhandled stage :', request.stage);
                  // should not make it here
                  break; // case request.stage
              }
              break;
            case 'BUY_BITCOINS':
              switch (request.stage) {
                case 'COMPLETED':
                  //TODO a ERROR HANDLING HERE
                  break;
              }
              break;
            default:
              debug('Unhandled request:', request.request);
              break;// case request.request
          }
        }
      }

      requestService.on('created', (request) => {
        requestUpdated(request);
      });
      requestService.on('updated', (request) => {
        requestUpdated(request);
      });
      requestService.on('patched', (request) => {
        requestUpdated(request);
      });

    }
  }
  init(app);
};