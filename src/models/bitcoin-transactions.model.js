// bitcoinTransactions-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

var mongoose = require('mongoose');




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
  const bitcoinTransactions = new Schema({
    // Begin Raw Transaction
    hex: { type: String, required: true },
    txid: { type: String, required: true },
    hash: { type: String, required: true },
    size: { type: Number, required: true },
    vsize: { type: Number, required: true },
    version: { type: Number, required: true },
    locktime: { type: Number, required: true },
    isQueue: { type: Boolean, index: true },
    isPending: { type: Boolean, index: true },
    isTentativeProcessed: { type: Boolean, index: true },
    isProcessed: { type: Boolean, index: true },
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
        }
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
    time: { type: String, required: true },
    timeDate: { type: Date, required: true },
    blocktime: { type: String },
    blocktimeDate: { type: Date },
    timereceived: { type: String },
    timereceivedDate: { type: Date },
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

  bitcoinTransactions.index({ txid: 1, category: 1 }, { unique: true });






  return mongooseClient.model('bitcoinTransactions', bitcoinTransactions);
};




