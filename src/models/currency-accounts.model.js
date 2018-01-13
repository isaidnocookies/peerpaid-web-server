// currency_accounts-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const currencyAccounts = new Schema({
    accountId: { type: String, required: true, unique: true },
    owner: { type: Schema.ObjectId},    
    currencyType: {
      type: String,
      enum: [
        'BTC',
        'USD',
        'EUR',
        'GBP'
      ], required: true
    },
    amount: { type: Number, default: 0},
    tentativeAmount: { type: Number, default: 0},
    txids: [{ type: String }],
    txidsTentative: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('currencyAccounts', currencyAccounts);
};
