// order-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const order = new Schema({
    stage: { type: String, enum: ['SUCCESS', 'FAIL', 'REJECTED', 'PENDING'], required: true },
    type: {
      type: String,
      enum: [
        'FUNDS_DEPOSIT',
        'SEND_CURRENCY',
        'EXCHANGE_CURRENCY',
        'DEPOSIT_TO_CONSIGNMENT',
        'WITHDRAW_CURRENCY',
        'SEND_BITCOINS',
        'CLOSE_TRADE_OFFER'
      ],
      required: false
    },
    transactions: [{
      type: Schema.ObjectId,
      ref: 'internalTransaction'
    }]
  }, {
    timestamps: true
  });
  return mongooseClient.model('order', order);
};
