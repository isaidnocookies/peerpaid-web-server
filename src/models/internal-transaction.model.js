// internal-transaction-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const internalTransaction = new Schema({
    currencyAccountOrigin: {
      type: Schema.ObjectId,
      ref: 'currencyAccounts',
    },
    currencyAccountDestination: {
      type: Schema.ObjectId,
      ref: 'currencyAccounts',
    },
    walletDestination: { type: String },
    order: {
      type: Schema.ObjectId,
      ref: 'order',
      required: false
    },
    type: {
      type: String,
      enum: [
        'FUNDS_DEPOSIT',
        'SEND_CURRENCY',
        'EXCHANGE_CURRENCY',
        'DEPOSIT_TO_CONSIGNMENT',
        'WITHDRAW_CURRENCY'
      ],
      required: false
    },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, enum: ['SUCCESS', 'FAIL', 'REJECTED', 'PENDING'], required: true },
    details: {
      description: { type: String, required: false },
      paymentTransactionId: { type: String, required: false },
      wallet: { type: String, required: false },
      transactionType: { type: String, required: false },
    }
  }, {
    timestamps: true
  });

  return mongooseClient.model('internalTransaction', internalTransaction);
};
