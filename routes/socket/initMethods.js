var config = require('config')
var jwtverify = require('../jwtverify');

var dsController = require('../../lib/dataServerController')

module.exports = function (socket) {
  
  socket.on('getClientConfig', (payload, callback) => {
    if (config.has("clientConfig")) {
      callback({ result: { clientConfig: config.get("clientConfig") } });
    }
    else {
      callback({ error: { message: "no client config" } })
    }
  })
  socket.on('getFreshToken', (payload, callback) => {
    if (socket.jwt) {

      var token = socket.token
      var method = "post"
      var url = "/users/token"
      var postData = { data: "" }

      var apiResponse = dsController.callApi(method, url, postData, token, (err, res) => {
        if (err) console.log("socket.initMethods.getFreshtoken:Error", err)

        callback({ error: err, response: res })

      })
      //TODO: get key from data server
      // callback({
      //   error: null,
      //   response: {
      //     token: jwtverify.getKey(socket.jwt, { expiresIn: 60 * 120 })
      //   }
      // })
    }
  })
}
