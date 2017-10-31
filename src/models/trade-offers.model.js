// tradeOffers-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const tradeOffers = new Schema({
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
    address: { type: String, required: false },
    paymentMethod: { type: String, required: true },
    currency: { type: String, required: true },
    margin: { type: String, required: true },
    minimumTransactionLimit: { type: Number, required: true },
    maximumTransactionLimit: { type: Number, required: true },
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

  return mongooseClient.model('tradeOffers', tradeOffers);
};
