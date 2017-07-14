var dsController = require('../api/dataServerController')

module.exports = function (socket) {
  socket.on('getUserData', (payload, callback) => {
    callback({ response: { success: true } })
  })

  socket.on('getProfileData', (payload, callback) => {
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
      
      callback({ error, response: result })
    })
  });
}

