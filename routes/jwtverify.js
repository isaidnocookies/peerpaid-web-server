var express = require('express')
var router = express.Router()

var jwt = require('jsonwebtoken')
var jwtkey = require('../lib/jwtkey')

function verifyToken(jwtDest, token, next) {
  if (token) {
    if (/^Bearer /.test(token)) {
      token = token.substr(7);
    }

    jwt.verify(token, jwtkey.pub, { algorithms: ['RS256'] }, function (err, decoded) {
      if (err) {
        jwtDest.jwt = void 0;
      }
      else {
        jwtDest.jwt = decoded;
      }
      next()
    });
  }
  else {
    next();
  }
}

// Verify the JWT and load into req.jwt
router.use(function (req, res, next) {
  var token = req.body.token || req.query.token || req.headers['authorization'] || req.cookies.token;
  verifyToken(req, token, next)
})

function socketIO(socket) {
  socket.use((packet, next) => {
    if (packet.length > 1) {
      verifyToken(packet[1], packet[1].token, next)
    }
    else {
      next()
    }
  });
}

function hasPermission(jwtObject, permission) {

  if (jwtObject[permission] || (jwtObject.permissions && jwtObject.permissions[permission])) {
    return true;
  }
  return false;
}

function checkAuth(req, res, next) {

  function checkAuthInternal(req, res, next) {

    if (typeof req === "string") {
      checkAuthInternal.permission.push(req);
      return checkAuthInternal;
    }
    if (Array.isArray(req)) {
      req.forEach(function (element, index, array) {
        checkAuthInternal.permission.push(element);
      });
      return checkAuthInternal;
    }
    else {
      var errorMessage = void 0;

      if (req.jwt === undefined) {
        errorMessage = "Invalid Authorization";
      }
      else {
        checkAuthInternal.permission.forEach(function (element, index, array) {
          if (!errorMessage && element != null && hasPermission(req.jwt, element) == false) {
            errorMessage = "Permission Denied";
          }
        });
      }

      if (errorMessage != void 0) {
        res.status(403).json({
          success: false,
          message: errorMessage,
        });
      }
      else {
        next();
      }
    }

  }
  checkAuthInternal.permission = [];
  return checkAuthInternal(req, res, next);
}

function socketAuth(packet, success, fail) {
  function socketAuthInternal(packet, success, fail) {

    if (typeof packet === "string") {
      socketAuthInternal.permission.push(packet);
      return socketAuthInternal;
    }
    else if (Array.isArray(packet) && (packet.length > 1 && typeof packet[1] !== 'object')) {

      packet.forEach(function (element, index, array) {
        socketAuthInternal.permission.push(element);
      });
      return socketAuthInternal;
    }
    else if (packet.length > 1) {
      var errorMessage = void 0;

      if (packet.length > 1 && packet[1].jwt === undefined) {
        errorMessage = "Invalid Authorization";
      }
      else {
        socketAuthInternal.permission.forEach(function (elemeent, index, array) {
          if (!errorMessage && element != null && hasPermission(packet[1].jwt, element) == false) {
            errorMessage = "Permission Denied";
          }
        });
      }
      if (errorMessage != void 0) {
        // res.status(403).json({
        //   success: false,
        //   message: errorMessage,
        // });
        if (packet.length > 1) {
          packet[1].error = errorMessage
        }
        if (fail) fail()

        // if (packet.length > 2 && typeof packet[2] === 'function') {
        //   packet[2]({ error: { message: errorMessage } })
        // }
      }
      else {
        if (success) success();
      }
    }
    else {
      if (fail) fail();
    }

  }
  socketAuthInternal.permission = [];
  return socketAuthInternal(packet, success, fail);

}


// router.get("/getkey/define", function (req, res, next) {
//   res.json({
//     method:"GET",
//     url:"/getkey",
//     secure:false,
//     inputs: [
//       {
//         name: "expiresIn",
//         type: "number",
//         description: "Seconds til Expiration"
//       }
//     ]
//   })
// });


// router.get("/getkey", function (req, res, next) {
//   var token = getKey(req, req.body);
//   res.json(token);
// });

function clone(obj) {
  return Object.assign({}, obj, {})
}

if (jwtkey.cert) {

  function getKey(req, body) {
    body.token = void 0;
    var expiresIn = body.expiresIn;
    body.expiresIn = void 0;

    var token = jwt.sign(body, jwtkey.cert, {
      algorithm: 'RS256',
      expiresIn: expiresIn
    });
    return token;
  }
}

module.exports = router;

module.exports.checkAuth = checkAuth //Authorization Middleware Function 
// usage
//  router.get("/path", checkAuth, successFunction );
//  router.get("/path", checkAuth("permissionRequired"), successFunction);
//  router.get("/path", checkAuth(["permission1","permission2","permission-n"]), successFunction)

module.exports.socketAuth = socketAuth //Authorization Middleware function for socket.io
// usage
//  socketAuth(packet, success, fail);
//      success function should call next
//      fail function should respond with an error or handle failure accordingly
//        if callback was provided by client, it will be called with {error:{message:"authoriation failed"}}
//  socket.use(function (packet, next){
//    socketAuth(packet, () => {next()}, () => { /* handle failure */}) ;
//    socketAuth("permissionRequired")(packet, () => { next() }, () => { /* handle failure */ });
//    socketAuth(["permission1","permission-n"])(packet, () => { next() }, () => { /* handle failure */ });
//  })
//  
if (jwtkey.cert) {

  module.exports.getKey = getKey; // Token generation (Only available when private key is available)
  // usage
  //  getKey(req, {object:"containing values to key"});

}

module.exports.clone = clone; // Clone an object so editing can commence
// Useful for token object creation from other objects
// usage
//  clone(req.body); 


module.exports.socketIO = socketIO // call auth on incoming socket
    // socketIO(socket)
    // Similar to express using this module as a route.
