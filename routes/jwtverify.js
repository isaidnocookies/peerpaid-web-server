var express = require('express')
var router = express.Router()

var jwt = require('jsonwebtoken')
var jwtkey = require('../lib/jwtkey')

// Verify the JWT and load into req.jwt
router.use(function (req, res, next) {
  var token = req.body.token;
  if (token) {
    jwt.verify(token, jwtkey.pub,{ algorithms: ['RS256'] }, function (err, decoded) {
      if(err) console.log("Err", err)
      console.log("decoded:", decoded) // bar
      req.jwt = decoded;
      next()
    });
  }
  else {
    next();
  }
})

function hasPermission(jwtObject, permission){
  
  if (jwtObject[permission] || ( jwtObject.permissions && jwtObject.permissions[permission] ) ){
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
    if (Array.isArray(req)){
      req.forEach(function (element, index, array){
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
  return checkAuthInternal(req,res,next);
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
//   console.log("Body:??", req.body)
//   var token = getKey(req, req.body);
//   res.json(token);
// });

function clone(obj){
  return Object.assign({}, obj, {})
}

if(jwtkey.cert){

  function getKey(req, body){
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
module.exports.checkAuth = checkAuth; //Authorization Middleware Function 
              // usage
              //  router.get("/path", checkAuth, successFunction );
              //  router.get("/path", checkAuth("permissionRequired"), successFunction);
              //  router.get("/path", checkAuth(["permission1","permission2","permission-n"]), successFunction)

if (jwtkey.cert){

  module.exports.getKey = getKey; // Token generation (Only available when private key is available)
                // usage
                //  getKey(req, {object:"containing values to key"});

}

module.exports.clone = clone; // Clone an object so editing can commence
                              // Useful for token object creation from other objects
              // usage
              //  clone(req.body); 



