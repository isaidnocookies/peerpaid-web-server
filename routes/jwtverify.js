var express = require('express')
var router = express.Router()

var jwt = require('jsonwebtoken')
var jwtkey = require('../lib/jwtkey')

var deasync = require('deasync')
var config = require('config')

// Token Verification method that add jwt and token to destination object
function verifyToken(pubKey, jwtDest, token, next) {
  if (token) {
    if (/^Bearer /.test(token)) {
      token = token.substr(7);
    }

    var done = false;
    jwt.verify(token, pubKey, { algorithms: ['RS256'] }, function (err, decoded) {
      if (err) {
        jwtDest.jwt = void 0;
        jwtDest.token = void 0;
      }
      else {
        jwtDest.jwt = decoded;
        jwtDest.token = token;
      }
      if (next) next()
      done = true;
    });

    if (next === void 0) {
      var count = 0;
      while (!done) {
        deasync.sleep(100)
        if (count > 20) break
        count++;
      }
    }
  }
  else {
    if (next) next();
  }
  return jwtDest;
}

function altCheckToken(pubkey) {
  return function (dest, token, next) {
    verifyToken(pubkey, dest, token, next)
  }
}

function checkToken(dest, token, next) {
  console.log("Token", token)
  return altCheckToken(jwtkey.pub)(dest, token, next)
}

function altTokenVerify(pubKey) {
  return function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['authorization'] || req.cookies.token;
    verifyToken(pubKey, req, token, next)
  }
}

// Verify the JWT and load into req.jwt
router.use(altTokenVerify(jwtkey.pub))


function socketIO(socket) {
  socket.use((packet, next) => {
    var token = void 0;
    if (packet.length > 1) {
      token = packet[1].token;
    }
    // else {
    //   next()
    // }
    verifyToken(jwtkey.pub, socket, token, next)

  });
}

function hasPermission(jwtObject, permission) {

  if (jwtObject[permission] || (jwtObject.permissions && jwtObject.permissions[permission])) {
    return true;
  }
  return false;
}

function checkPermissions(jwtObject, permissionSet, booleanPermissions) {
  if (permissionSet === void 0) return true;
  if (Array.isArray(permissionSet)) {
    if (booleanPermissions === void 0) {
      if (permissionSet.length === 0) return true;
      if (Array.isArray(permissionSet[0])) {
        return checkPermissions(permissionSet, true)
      }
      else {
        return checkPermissions(permissonSet, false)
      }
    }
    else {
      // Boolean permission starts false and finds any true
      // Non boolean permission starts true, and ends when a false is encountered
      var result = !booleanPermission;
      permissionSet.forEach(function (element, index, array) {
        if (booleanPermissions) {
          if (result == false && element != null && hasPermission(jwtObject, element) == true) {
            result == true
          }
        }
        else {
          if (result == true && element != null && hasPermission(jwtObject, element) == false) {
            result = false
          }
        }
      });
      return result;
    }
  }
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
      var error = void 0;

      if (req.jwt === undefined) {
        error = config.get("errors.invalidAuth.error");
      }
      else {
        if (!checkPermissions(req.jwt, checkAuthInternal.permissions)) {
          error = config.get("errors.permissionDenied.error")
        }
      }

      if (error != void 0) {
        res.status(403).json({
          error,
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
      var error = void 0;

      if (packet.length > 1 && packet[1].jwt === undefined) {
        error = config.get("errors.invalidAuth.error");
      }
      else {
        if (!checkPermissions(packet[1].jwt, checkAuthInternal.permissions)) {
          error = config.get("errors.permissionDenied.error")
        }
      }
      if (error != void 0) {
        // res.status(403).json({
        //   success: false,
        //   message: errorMessage,
        // });
        if (packet.length > 1) {
          packet[1].error = error
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

function clone(obj) {
  return Object.assign({}, obj, {})
}

if (jwtkey.cert) {
  function getKey(body, options) {
    return getKeyFromCert(jwtkey.cert, body, options)
  }
}


function getKeyFromCert(cert, body, options) {
  if (options !== void 0) {
    if (options.expiresIn || options.expireSeconds) {
      body.iat = void 0;
      body.exp = void 0;
      body.expiresIn = options.expiresIn || options.expireSeconds || 10;
    }
  }
  // reject password
  body.password = void 0;
  // reject token
  body.token = void 0;

  var expiresIn = body.expiresIn;
  body.expiresIn = void 0;

  var token = jwt.sign(body, cert, {
    algorithm: 'RS256',
    expiresIn: expiresIn
  });
  return token;
}

module.exports = router;

module.exports.altCheckToken = altCheckToken

module.exports.checkToken = checkToken

module.exports.altTokenVerify = altTokenVerify
// Method on top of checkAuth to change the token verification to another pub key

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

  module.exports.getKey = getKey // Token generation (Only available when private key is available)
  // usage
  //  getKey(req, {object:"containing values to key"});

}

module.exports.getKeyFromCert = getKeyFromCert

module.exports.clone = clone; // Clone an object so editing can commence
// Useful for token object creation from other objects
// usage
//  clone(req.body); 


module.exports.socketIO = socketIO // call auth on incoming socket
    // socketIO(socket)
    // Similar to express using this module as a route.
