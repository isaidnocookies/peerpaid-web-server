
const debug = require('../lib/debug');

var path = require('path');

const config = require('config');
var configSettings = config.get('cardpay');
var respondWithContent = configSettings.respondWithContent;
var responseContentFile = configSettings.responseContentFile;

const ObjectID = require('mongodb').ObjectID;

module.exports = function (options = {}) {
  return function threeds (req, res) {
    var requests = options.app.service('requests');
    try {
      var MD = req.body.MD;
      var PaRes = req.body.PaRes;
      if (MD !== '' && PaRes !== '') {
        requests.create({
          request: 'CREATE_DEPOSIT_ORDER',
          token: 'DATA',
          stage: '3DSLOCK_VERIFIED',
          /**
           * TO DO:
           * How to take the user Id automatically while creating the request Object??
           */
          owner: ObjectID('aaffaaffaaffaaffaaffaaff'),
          payload: {
            MD: req.body.MD,
            PaRes: req.body.PaRes
          }
        }).then(() => {
          // The gateway is expecting 200 confirmation
          if (respondWithContent) {
            res.sendFile(path.join(__dirname + '/responses/' + responseContentFile + '.html'));
          } else {
            res.sendStatus(200);
          }
        });
      } else {
        // We do not understand the parameters...
        res.sendStatus(400);
      }
    } catch (err) {
      debug(err);
    }
  };
};

