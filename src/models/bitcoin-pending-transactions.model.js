// bitcoinTransactions-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

var mongoose = require('mongoose')




// function BitcoinDate(seconds) {
//   mongoose.SchemaType.call(this, seconds, 'BitcoinDate');
// }
// BitcoinDate.prototype = Object.create(mongoose.SchemaType.prototype);

// BitcoinDate.prototype.cast = function (val) {
//   var _val = Number(val);
//   if (val instanceof Date) {
//     return val;
//   } else if (!isNaN(_val)) {

//     return new Date(_val * 1000);
//   }
//   else {
//     return new Date(_val);
//   }
// };

// mongoose.Schema.Types.BitcoinDate = BitcoinDate;







module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const bitcoinPendingTransactions = new Schema({
    // Begin Raw Transaction
    hex: { type: String, required: true },
    txid: { type: String, required: true },
    hash: { type: String, required: true },
    size: { type: Number, required: true },
    vsize: { type: Number, required: true },
    version: { type: Number, required: true },
    locktime: { type: Number, required: true },
    vin: [
      {
        coinbase: { type: String, required: false },
        txinwitness: [
          { type: String, require: false }
        ],
        sequence: { type: Number, required: false },
        txid: { type: String, required: false },
        vout: { type: Number, required: false },
        scriptSig: {
          asm: { type: String, required: false },
          hex: { type: String, required: false }
        },
        sequence: { type: Number, required: false }
      }
    ],
    vout: [
      {
        value: { type: String, required: false },
        bitcoins: {
          bitcoins: { type: Number },
          satoshis: { type: Number }
        },
        n: { type: Number, required: false },
        scriptPubKey: {
          asm: { type: String, required: false },
          hex: { type: String, required: false },
          reqSigs: { type: Number, required: false },
          type: { type: String, required: false },
          addresses: [
            { type: String }
          ]
        }
      },
      {
        value: { type: String, require: false },
        n: { type: Number, required: false },
        scriptPubKey: {
          asm: { type: String, required: false },
          hex: { type: String, required: false },
          reqSigs: { type: Number, required: false },
          type: { type: String, required: false },
          addresses: [
            { type: String }
          ]
        }
      }
    ],
    blockhash: { type: String },
    confirmations: { type: Number, required: true },
    time: { type: String},
    timeDate: { type: Date},
    blocktime: { type: String },
    blocktimeDate: { type: Date},
    timereceived: { type: String },
    timereceivedDate: { type: Date},
    address: { type: String, required: true, index: true },
    category: { type: String, required: true },
    amount: { type: String, required: false },
    bitcoins: {
      bitcoins: { type: Number },
      satoshis: { type: Number }
    },
    walletconflicts: [],



    //End Raw Transaction
    createdAt: { type: Date, default: Date.now, index: true },
    updatedAt: { type: Date, default: Date.now, index: true }
  });



  bitcoinPendingTransactions.index({ txid: 1, category: 1 }, { unique: true });





  return mongooseClient.model('bitcoinPendingTransactions', bitcoinPendingTransactions);
};












// tx = {
//   "account": "PeerPaid1",
//   "address": "mo48SgAf2r1qiMpJR2iK5tAcvoCXz22PmW",
//   "category": "receive",
//   "amount": 3,
//   "label": "PeerPaid1",
//   "vout": 0,
//   "confirmations": 0,
//   "trusted": false,
//   "txid": "f139aa038a8d425b9efdb3a72400124d46b5de558605bbbc3d71fb360f240edb",
//   "walletconflicts": [],
//   "time": 1503107303,
//   "timereceived": 1503107303,
//   "bip125-replaceable": "no"
// }
// Result = {
//   "hex": "0100000001a20a042819ca582c5d8e75502d1dfe48303cb419b30112a3e0e6dc0d0bddd595010000006b483045022100c865fbedbed2e09de85f71f519173ccb764035993ddeab2987c332870f8fd50202203bdddcf0a2c8c7c02ebce85deb85a98a936ad3f0e62682370a32c1ab6efb4fbc0121036cea66c4950d97b02d1963ac2524cdd7e08093a80478973c2be28bd9a96eab23ffffffff0200a3e111000000001976a91452ae3f39ac3733c68d820bb6e858bc63387fe7ff88acfd98b267730000001976a914e4e60478433eda32ac531fafd56956d29b88cd8b88ac00000000",
//   "txid": "f139aa038a8d425b9efdb3a72400124d46b5de558605bbbc3d71fb360f240edb",
//   "hash": "f139aa038a8d425b9efdb3a72400124d46b5de558605bbbc3d71fb360f240edb",
//   "size": 226,
//   "vsize": 226,
//   "version": 1,
//   "locktime": 0,
//   "vin": [
//     {
//       "txid": "95d5dd0b0ddce6e0a31201b319b43c3048fe1d2d50758e5d2c58ca1928040aa2",
//       "vout": 1,
//       "scriptSig": {
//         "asm": "3045022100c865fbedbed2e09de85f71f519173ccb764035993ddeab2987c332870f8fd50202203bdddcf0a2c8c7c02ebce85deb85a98a936ad3f0e62682370a32c1ab6efb4fbc[ALL] 036cea66c4950d97b02d1963ac2524cdd7e08093a80478973c2be28bd9a96eab23",
//         "hex": "483045022100c865fbedbed2e09de85f71f519173ccb764035993ddeab2987c332870f8fd50202203bdddcf0a2c8c7c02ebce85deb85a98a936ad3f0e62682370a32c1ab6efb4fbc0121036cea66c4950d97b02d1963ac2524cdd7e08093a80478973c2be28bd9a96eab23"
//       },
//       "sequence": 4294967295
//     }
//   ],
//   "vout": [
//     {
//       "value": 3,
//       "n": 0,
//       "scriptPubKey": {
//         "asm": "OP_DUP OP_HASH160 52ae3f39ac3733c68d820bb6e858bc63387fe7ff OP_EQUALVERIFY OP_CHECKSIG",
//         "hex": "76a91452ae3f39ac3733c68d820bb6e858bc63387fe7ff88ac",
//         "reqSigs": 1,
//         "type": "pubkeyhash",
//         "addresses": [
//           "mo48SgAf2r1qiMpJR2iK5tAcvoCXz22PmW"
//         ]
//       }
//     },
//     {
//       "value": 4956.60996861,
//       "n": 1,
//       "scriptPubKey": {
//         "asm": "OP_DUP OP_HASH160 e4e60478433eda32ac531fafd56956d29b88cd8b OP_EQUALVERIFY OP_CHECKSIG",
//         "hex": "76a914e4e60478433eda32ac531fafd56956d29b88cd8b88ac",
//         "reqSigs": 1,
//         "type": "pubkeyhash",
//         "addresses": [
//           "n2PFugfTgZSAAQCbMzfrCHUmtKWhf9uuT6"
//         ]
//       }
//     }
//   ]
// }






