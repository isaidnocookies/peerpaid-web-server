module.exports = function (socket) {
  socket.on('getUserData', (payload, callback) => {
    callback({response:{success:true}})
    
  })
}
