var config = require('config')
const request = require('request')
const deasync = require('deasync')

var builder = function (serverHost) {


  var controller = {}

  controller.relay = (options, successCallback, errorCallback) => {

    return (req, res, next) => {

      if (options === void 0) options = {}
      var requestOptions = {
        method: options.method || req.method,
        url: serverHost + (options.url || req.originalUrl.substring(4)),
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
              error: error
            })
          }
          else {
            res.status(response.statusCode).json({
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
        url: serverHost + options.url,
        json: (options.json === void 0 ? true : options.json),
        body: options.body,
        headers: {
          authorization: options.authorization || (options.headers && options.headers.authorization)
        }
      }

      request(requestOptions, function (error, response, body) {
        callback(error || (body && body.error), (body && body.result));
      })
    }
  }

  controller.callApi = (method, url, postData, token, callback) => {
    if (callback === void 0 && typeof token === 'function') {
      callback = token;
      token = void 0
    } else if (token === void 0 && typeof postData === 'function') {
      callback = postData;
      postData = void 0
    }
    var requestOptions = {
      method: method,
      url: serverHost + url,
      json: true,
      body: postData,
      headers: {
        authorization: token
      }
    }

    request(requestOptions, function (error, response, body) {
      var result = body;
      callback(error, result);
    })
  }

  controller.callApiSync = (method, url, postData, token) => {
    var res
    var err

    controller.callApi(method, url, postData, token, (error, result) => {
      err = error
      res = result
    })

    var count = 0;
    while (res === void 0 && err === void 0) {
      deasync.sleep(100)
      //if (count >= 30) break;
      //count++;

    }
    return { error: err || (res && res.error), result: (res && (res.result || res)) }
  }

  return controller;

}
module.exports = builder;