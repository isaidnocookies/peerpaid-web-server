var jwtverify = require('./jwtverify')

var uuid = require('uuid/v4')


var profile = require('./socket/profile')
var bitcoin = require('./socket/bitcoin')

var initMethods = require('./socket/initMethods')
var config = require('config')
// export function for listening to the socket

var express = require('express');
var router = express.Router();


function getio() {
  return global.io;
}


router.use(function (req, res, next) {
  console.log("Used /socket");
  next()
})

router.post('/confirmation', jwtverify.checkAuth, function (req, res, next) {

  var sent = false;
  var canSend = () => {
    if (sent) return false;
    return sent = true;

  }
  var send = (data) => {
    if (canSend()) {
      res.send(data)
    }
  }
  if (req.jwt) {

    var guid = uuid();

    var sockets = getio().in(req.jwt.username)
    var listeningSockets = []
    var removeSocketListeners = () => {
      if (listeningSockets === void 0) return;
      var lSockets = listeningSockets;
      listeningSockets = void 0
      lSockets.forEach((lSocket) => {
        lSocket.removeAllListeners(guid);
      })
    }

    // HACK: All Sockets in a Room
    Object.keys(sockets.sockets).forEach((roomSocketId) => {
      var roomSocket = sockets.sockets[roomSocketId]
      roomSocket.on(guid, (payload) => {
        send(payload)
        removeSocketListeners()
        roomSocket.broadcast.emit('removeConfirmation', { guid: payload.guid });
      })
    })

    var timeout = 10;
    if (req.body.timeout && req.body.timeout > 8) {
      timeout = (req.body.timeout + 10)
    }
    var timeoutInt = setTimeout(function () {
      removeSocketListeners();
      send({ error: { message: "No Reply" } })
    }, 1000 * timeout);

    getio().in(req.jwt.username).emit("getConfirmation", {
      uuid: guid,
      title: req.body.title || "Confirmation Required",
      message: req.body.message,
      yes: req.body.yes || "Yes",
      no: req.body.no || "No",
      timeout: req.body.timeout
    })
  }
  else {
    send(config.get("errors.invalidAuth"));
  }
});

module.exports = router;




module.exports.connection = function (socket) {

  jwtverify.socketIO(socket)

  socket.use(function (packet, next) {
    if (socket.jwt) {
      console.log("jwt:", socket.jwt)
      if (!socket.roomNames || socket.rooms.length !== socket.roomNames.length) {
        socket.roomNames = Object.keys(socket.rooms);
      }
      if (socket.roomNames.indexOf(socket.jwt.username) < 0) {
        socket.join(socket.jwt.username, () => {
          next();
        });
      }
      else {
        next();
      }
    }
    else {
      next();
    }
  })


  initMethods(socket);

  profile(socket);
  bitcoin(socket);


  socket.use(function (packet, next) {
    // console.log("TODO: unknown emit", packet)
    next();
  });

  socket.emit('init', {
    connected: true,
    success: true
  });
  socket.on('error', function (err){
    console.log("TODO: emit error ??", err)
  })
  socket.on('disconnect', function () {

  });
};
