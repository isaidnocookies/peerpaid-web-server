var config = require('config')
const request = require('request')


var controller = {}
controller.relay = (options, successCallback, errorCallback) => {

  return (req, res, next) => {

    if (options === void 0) options = {}
    var requestOptions = {
      method: options.method || req.method,
      url: config.get('dataServer') + (options.url || req.originalUrl.substring(4)),
      json: (config.json === void 0 ? true : config.json),
      body: req.body,
      headers: {
        referrer: req.headers.referrer,
        authorization: req.headers.authorization,
        origin: req.headers.origin,
        accept: req.headers.accept
      }
    }

    request(requestOptions, function (error, response, body) {

      if (error) {

        if (response === void 0) {
          console.log("Error:", error);
          res.status(500).json({
            success: false,
            error: error
          })
        }
        else {
          res.status(response.statusCode).json({
            success: false,
            error: error
          })
        }
      } else {
        res.status(response.statusCode).json(body);
      }
    })
  }
}

controller.socketRelay = (options) => {

  return (packet, callback) => {

    if (options === void 0) options = {}
    var requestOptions = {
      method: options.method || req.method,
      url: config.get('dataServer') + options.url,
      json: (options.json === void 0 ? true : options.json),
      body: options.body,
      headers: {
        authorization: options.authorization
      }
    }

    request(requestOptions, function (error, response, body) {

      var result = body;
      callback( error, result );
    })
  }
}

module.exports = controller;