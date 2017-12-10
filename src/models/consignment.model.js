// tradeOffers-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const consignment = new Schema({
    tradeOffer: {
      type: Schema.ObjectId,
      ref: 'tradeOffers',
      required: true
    },
    currencyAccount: {
      type: Schema.ObjectId,
      ref: 'currencyAccounts',
      required: true
    },
    availableAmount: { type: Number, required: true },
    orders: [{
      type: Schema.ObjectId,
      ref: 'order',
      required: true
    }],
    status: {
      type: String,
      enum: [
        'OPEN',
        'CLOSED',
      ], required: true
    }

  },
  {
    timestamps: true
  });

  return mongooseClient.model('consignment', consignment);
};
