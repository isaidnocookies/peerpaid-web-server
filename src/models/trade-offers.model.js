// tradeOffers-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const tradeOffer = new Schema({
    owner: { type: Schema.ObjectId },
    type: {
      type: String,
      enum: [
        'BUY_LOCALLY',
        'SELL_LOCALLY',
        'BUY_ONLINE',
        'SELL_ONLINE'
      ], required: true
    },
    account: { type: String, required: false },
    username: { type: String, required: false },
    user_uuid: { type: String, required: false },
    address: { type: String, required: false },
    paymentMethod: { type: String, required: true },
    currencyWanted: { type: String, required: true },
    currencyToExchange: { type: String, required: true },
    currencyAmount: { type: String, required: true },
    margin: { type: String, required: true },
    minimumTransactionLimit: { type: Number, required: true },
    maximumTransactionLimit: { type: Number, required: true },
    tradeLimit: { type: String, required: false },
    termsTrade: { type: String, required: false },
    status: {
      type: String,
      enum: [
        'OPEN',
        'CLOSED',
      ], required: true
    },
    securityOptions: []
  }, {
    timestamps: true
  });

  return mongooseClient.model('trade-offers', tradeOffer);
};
