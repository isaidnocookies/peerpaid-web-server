// bitcoinTransactions_proccessed-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const bitcoinTransactionsProccessed = new Schema({
    txid: { type: String, required: true },
    confirmations: { type: Number, required: true },
    address: { type: String, required: true, index: true },
    category: { type: String, required: true },
    amount: { type: String, required: false },



    createdAt: { type: Date, default: Date.now, index: true },
    updatedAt: { type: Date, default: Date.now, index: true }
  });

  bitcoinTransactionsProccessed.index({ txid: 1, category: 1 }, { unique: true });
  
  
  return mongooseClient.model('bitcoinTransactionsProccessed', bitcoinTransactionsProccessed);
};
