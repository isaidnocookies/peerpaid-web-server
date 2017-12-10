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
      required: true
    },
    order: {
      type: Schema.ObjectId,
      ref: 'order',
      required: false
    },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, enum: ['SUCCESS', 'FAIL', 'REJECTED', 'PENDING'], required: true },
    details: {
      description: { type: String, required: false },
      paymentTransactionId: { type: String, required: false }
    }
  }, {
      timestamps: true
    });

  return mongooseClient.model('internalTransaction', internalTransaction);
};
