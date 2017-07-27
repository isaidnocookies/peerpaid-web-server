var dsController = require('../../lib/dataServerController')
var config = require("config")

module.exports = function (socket) {
  socket.on('getUserData', (payload, callback) => {
    if (socket.jwt) {
      callback({ result: {} })
    }
    else {
      callback(config.get("errors.invalidAuth"))
    }
  })



  socket.on('getProfileData', (payload, callback) => {
    if (socket.jwt) {
      var options = {
        method: "get",
        url: "/profile/data",
        json: true,
        body: payload,
        headers: {
          authorization: payload.token
        }
      }
      dsController.socketRelay(options)(payload, (error, result) => {
        callback({ error, result: { user: result } })
      })
    }
    else {
      callback(config.get("errors.invalidAuth"))
    }
  });
}

