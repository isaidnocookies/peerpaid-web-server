var dsController = require('../../lib/dataServerController')
var config = require('config')
module.exports = function (socket) {
  socket.on('getBitcoinWallet', (payload, callback) => {
    if (typeof payload === 'function') {
      callback = payload;
      payload = void 0;
    }

    console.log("Payload:", payload)
    if (socket.jwt) {
      var options = {
        method: "get",
        url: "/profile/wallet",
        json: true,
        // body: payload,
        authorization: "Bearer " + payload.token
      }
      dsController.socketRelay(options)({}, (error, result) => {
        callback({
          error,
          response: {
            user: result
          }
        })
      })
    }
    else {
      callback(config.get("errors.invalidAuth"));
    }
  })

  socket.on("getBitcoinTransaction", (payload) => {
    console.log("GetBitcoin Transaction", payload)
    if (typeof payload === 'function') {
      callback = payload;
      payload = void 0;
    } 

    if (socket.jwt && payload.txid) {
      var options = {
        method: "get",
        url: "/profile/wallet/transaction",
        json: true,
        body: {
          txid: payload.txid
        },
        headers: {
          authorization: payload.token
        }
      }
      dsController.socketRelay(options)({}, (error, result) => {
        if (error) console.log("webServer socket/bitcoin:error", error)
          
      })
    }
    else {
      console.log("getBitcoinTransaction: no txid")
      // callback(config.get("errors.invalidAuth"));
    }
  })
}

