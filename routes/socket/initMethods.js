var config = require('config')

module.exports = function (socket) {
  if (!socket.hasSentClientConfig) {
    socket.hasSentClientConfig = true;
    if (config.has("clientConfig")) {
      socket.emit('clientConfig', config.get("clientConfig"))
    }
  }
  socket.on('getConfig', (payload, callback) => {
    if (config.has("clientConfig")) {
      socket.emit('clientConfig', config.get("clientConfig"))
    }
  })
}
