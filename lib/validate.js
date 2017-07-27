var Ajv = require('ajv');

var ajv = new Ajv({ useDefaults: true });
var schema = {
  "type": "object",
  "properties": {
    "success": { "type": "boolean" },
    "error": { "type": ["object", "null"] },
    "result": { "type": ["object", "null"] }
  },
  "anyOf": [
    { "required": ["success", "error"] },
    { "required": ["success", "result"] },
  ]
};

var validatePayload = ajv.compile(schema);
//console.log(validateSocket(data));

function validateSocket(socket) {
  // Middle Ware Packet Verification
  socket.use(function (packet, next) {
    if (Array.isArray(packet)) {
      var fn = packet[packet.length - 1];
      if (typeof fn === 'function') {
        packet[packet.length - 1] = (payload) => {
          
          if (payload) {
            if (payload.error) {
              payload.success = false;
            }
            else {
              payload.success = true;
            }
          }
          if (validatePayload(payload)) {
            // console.trace("Socket:FN", payload)
            packet[packet.length - 1].fn(payload)
          }
          else {
            console.trace("Socket:Bad Payload", payload)
          }
        }
        packet[packet.length - 1].fn = fn;
      }
    }
    else {
      Console.log("What is Packet", packet)
    }
    next();
  })
}

function validateExpress(router) {
  router.use(function (req, res, next) {

    res.callJson = res.json;
    res.json = function (payload) {
      if (req.jwt && req.jwt.exp) {
        var expTime = Math.floor(Date.now() / 1000);
        var expLeft = req.jwt.exp - expTime
        if (expLeft < 120) {
          payload.tokenExpiring = true;
        }
      }


      if (payload) {
        if (payload.error) {
          payload.success = false;
        }
        else {
          payload.success = true;
        }
      }
      if (validatePayload(payload)) {
        // console.trace("Express:callJson:", payload)
        res.callJson(payload)
      }
      else {
        console.trace("Express:Bad Payload", payload)
      }
    }
    next();
  })
}


module.exports = {
  socket: validateSocket,
  express: validateExpress,
  payloadCheck: validatePayload
}