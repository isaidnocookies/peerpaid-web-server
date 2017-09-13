// currency_accounts-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const currencyAccounts = new Schema({
    amount: { type: String, required: true},
    accountId: { type: String, required: true },
    txids: [{
      type: Schema.ObjectId,
      ref: 'bitconTransactionsProcessed'
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('currencyAccounts', currencyAccounts);
};
