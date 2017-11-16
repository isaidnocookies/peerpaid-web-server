var Bitcoin = require('bitcoin-core');
var waterfall = require('async-waterfall')
var math = require('mathjs')
var config = require('config')

//https://bitcoinfees.21.co/api/v1/fees/recommended

/*
1 mBTC = 0.001 BTC (milli BTC)
1 uBTC = 0.001 mBTC (micro BTC or millionth of BTC)
1 satoshi = 0.01 uBTC (smallest unit of divisibility, hundred milltionth of a Bitcoin).
*/




// == Blockchain ==
// bitcoin-cli getbestblockhash
// bitcoin-cli getblock "blockhash" ( verbose )
// bitcoin-cli getblockchaininfo
// bitcoin-cli getblockcount
// bitcoin-cli getblockhash height
// bitcoin-cli getblockheader "hash" ( verbose )
// bitcoin-cli getchaintips
// bitcoin-cli getdifficulty
// bitcoin-cli getmempoolancestors txid (verbose)
// bitcoin-cli getmempooldescendants txid (verbose)
// bitcoin-cli getmempoolentry txid
// bitcoin-cli getmempoolinfo
// bitcoin-cli getrawmempool ( verbose )
// bitcoin-cli gettxout "txid" n ( include_mempool )
// bitcoin-cli gettxoutproof ["txid",...] ( blockhash )
// bitcoin-cli gettxoutsetinfo
// bitcoin-cli preciousblock "blockhash"
// bitcoin-cli pruneblockchain
// bitcoin-cli verifychain ( checklevel nblocks )
// bitcoin-cli verifytxoutproof "proof"

// == Control ==
// bitcoin-cli getinfo
// bitcoin-cli getmemoryinfo
// bitcoin-cli help ( "command" )
// bitcoin-cli stop

// == Generating ==
// bitcoin-cli generate nblocks ( maxtries )
// bitcoin-cli generatetoaddress nblocks address (maxtries)

// == Mining ==
// bitcoin-cli getblocktemplate ( TemplateRequest )
// bitcoin-cli getmininginfo
// bitcoin-cli getnetworkhashps ( nblocks height )
// bitcoin-cli prioritisetransaction <txid> <priority delta> <fee delta>
// bitcoin-cli submitblock "hexdata" ( "jsonparametersobject" )

// == Network ==
// bitcoin-cli addnode "node" "add|remove|onetry"
// bitcoin-cli clearbanned
// bitcoin-cli disconnectnode "address" 
// bitcoin-cli getaddednodeinfo ( "node" )
// bitcoin-cli getconnectioncount
// bitcoin-cli getnettotals
// bitcoin-cli getnetworkinfo
// bitcoin-cli getpeerinfo
// bitcoin-cli listbanned
// bitcoin-cli ping
// bitcoin-cli setban "subnet" "add|remove" (bantime) (absolute)
// bitcoin-cli setnetworkactive true|false

// == Rawtransactions ==
// bitcoin-cli createrawtransaction [{"txid":"id","vout":n},...] {"address":amount,"data":"hex",...} ( locktime )
// bitcoin-cli decoderawtransaction "hexstring"
// bitcoin-cli decodescript "hexstring"
// bitcoin-cli fundrawtransaction "hexstring" ( options )
// bitcoin-cli getrawtransaction "txid" ( verbose )
// bitcoin-cli sendrawtransaction "hexstring" ( allowhighfees )
// bitcoin-cli signrawtransaction "hexstring" ( [{"txid":"id","vout":n,"scriptPubKey":"hex","redeemScript":"hex"},...] ["privatekey1",...] sighashtype )

// == Util ==
// bitcoin-cli createmultisig nrequired ["key",...]
// bitcoin-cli estimatefee nblocks
// bitcoin-cli estimatepriority nblocks
// bitcoin-cli estimatesmartfee nblocks
// bitcoin-cli estimatesmartpriority nblocks
// bitcoin-cli signmessagewithprivkey "privkey" "message"
// bitcoin-cli validateaddress "address"
// bitcoin-cli verifymessage "address" "signature" "message"

// == Wallet ==
// bitcoin-cli abandontransaction "txid"
// bitcoin-cli addmultisigaddress nrequired ["key",...] ( "account" )
// bitcoin-cli addwitnessaddress "address"
// bitcoin-cli backupwallet "destination"
// bitcoin-cli bumpfee "txid" ( options ) 
// bitcoin-cli dumpprivkey "address"
// bitcoin-cli dumpwallet "filename"
// bitcoin-cli encryptwallet "passphrase"
// bitcoin-cli getaccount "address"
// bitcoin-cli getaccountaddress "account"
// bitcoin-cli getaddressesbyaccount "account"
// bitcoin-cli getbalance ( "account" minconf include_watchonly )
// bitcoin-cli getnewaddress ( "account" )
// bitcoin-cli getrawchangeaddress
// bitcoin-cli getreceivedbyaccount "account" ( minconf )
// bitcoin-cli getreceivedbyaddress "address" ( minconf )
// bitcoin-cli gettransaction "txid" ( include_watchonly )
// bitcoin-cli getunconfirmedbalance
// bitcoin-cli getwalletinfo
// bitcoin-cli importaddress "address" ( "label" rescan p2sh )
// bitcoin-cli importmulti "requests" "options"
// bitcoin-cli importprivkey "bitcoinprivkey" ( "label" ) ( rescan )
// bitcoin-cli importprunedfunds
// bitcoin-cli importpubkey "pubkey" ( "label" rescan )
// bitcoin-cli importwallet "filename"
// bitcoin-cli keypoolrefill ( newsize )
// bitcoin-cli listaccounts ( minconf include_watchonly)
// bitcoin-cli listaddressgroupings
// bitcoin-cli listlockunspent
// bitcoin-cli listreceivedbyaccount ( minconf include_empty include_watchonly)
// bitcoin-cli listreceivedbyaddress ( minconf include_empty include_watchonly)
// bitcoin-cli listsinceblock ( "blockhash" target_confirmations include_watchonly)
// bitcoin-cli listtransactions ( "account" count skip include_watchonly)
// bitcoin-cli listunspent ( minconf maxconf  ["addresses",...] [include_unsafe] )
// bitcoin-cli lockunspent unlock ([{"txid":"txid","vout":n},...])
// bitcoin-cli move "fromaccount" "toaccount" amount ( minconf "comment" )
// bitcoin-cli removeprunedfunds "txid"
// bitcoin-cli sendfrom "fromaccount" "toaddress" amount ( minconf "comment" "comment_to" )
// bitcoin-cli sendmany "fromaccount" {"address":amount,...} ( minconf "comment" ["address",...] )
// bitcoin-cli sendtoaddress "address" amount ( "comment" "comment_to" subtractfeefromamount )
// bitcoin-cli setaccount "address" "account"
// bitcoin-cli settxfee amount
// bitcoin-cli signmessage "address" "message"




var bitcoin = new Bitcoin({
  host: config.get("bitcoin.host"),
  port: config.get("bitcoin.port"),
  ssl: config.get("bitcoin.ssl"),
  username: config.get("bitcoin.user"),
  password: config.get("bitcoin.pass"),
  timeout: config.get("bitcoin.timeout")
});
var accountName = config.get("bitcoin.accountName");

module.exports = bitcoin;

module.exports.unspent = function unspent(next) {
  // bitcoin-cli listunspent ( minconf maxconf  ["addresses",...] [include_unsafe] )
  bitcoin.listUnspent(function (err, results, resHeaders) {
    // if (err) return console.log(err);
    next(err, results)
  });
}

module.exports.decodeRawTransaction = function decodeRawTransaction(txid, callback) {
  // bitcoin-cli getrawtransaction "txid" ( verbose )
  bitcoin.getRawTransaction(txid, function (error, result) {
    // bitcoin-cli decoderawtransaction "hexstring"
    bitcoin.decodeRawTransaction(result, function (error, result) {
      callback(error, result)
    })
  })
}

module.exports.getTransactionFee = function getTransactionFee(txid, callback) {
  // bitcoin-cli getrawtransaction "txid" ( verbose )
  bitcoin.getRawTransaction(txid, 1, function (error, result) {
    var vin = result.vin;
    var rawTransaction = result;
    var vout = result.vout.map((vItem) => { return vItem.value });
    var voutValue = vout.reduce(function (sum, value) {
      return math.add(math.bignumber(sum), math.bignumber(value));
    })
    var methods = vin.map(function (vinItem, index) {
      var fnResult = void 0;
      if (index === 0) {
        fnResult = (callback) => {
          // bitcoin-cli getrawtransaction "txid" ( verbose )
          bitcoin.getRawTransaction(vinItem.txid, 1, function (error, result) {
            var voutValue = math.bignumber(result.vout[vinItem.vout].value)
            callback(error, voutValue);
          })
        }
      }
      else {
        fnResult = function (valueIn, callback) {
          // bitcoin-cli getrawtransaction "txid" ( verbose )
          bitcoin.getRawTransaction(vinItem.txid, 1, function (error, result) {
            var voutValue = math.bignumber(result.vout[vinItem.vout].value)
            callback(error, math.add(voutValue, valueIn));
          })
        }
      }
      return fnResult

    })

    waterfall(
      methods,
      function (error, result) {
        var fee = math.add(result, math.bignumber(-voutValue));
        var btcPerB = math.divide(fee, math.bignumber(rawTransaction.size)).toFixed(11)
        var satoshiPerB = math.multiply(100000000, btcPerB)
        callback(error, {
          total: fee.toString(),
          btcPerB: btcPerB.toString(),
          satoshiPerB,
          size: rawTransaction.size
        })
      }
    );

  })
}



