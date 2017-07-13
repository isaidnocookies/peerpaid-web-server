var jwtverify = require('./jwtverify')

var users = require('./socket/users')
var initMethods = require('./socket/initMethods')
var config = require('config')
// export function for listening to the socket
module.exports = function (socket) {

  jwtverify.socketIO(socket)
  socket.use(function (packet, next) {
    next();
  });

  socket.use((packet, next) => {
    jwtverify.socketAuth(packet,
      () => {
        // authorized Sockets
        users(socket);
        next();
      },
      () => {
        next();
      });
  });
  
  initMethods(socket);

  socket.use(function (packet, next) {
    next();
  });

  socket.emit('init', {
    connected: true,
    success: true
  });
  socket.on('disconnect', function () {
  });
};
