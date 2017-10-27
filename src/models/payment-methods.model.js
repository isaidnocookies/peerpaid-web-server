module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const wallets = new Schema({
    method: { type: String, required: true, unique: true },
    currency: { type: String, required: false },
    details: [{ type: String }],
  });

  return mongooseClient.model('payment-method', wallets);
};

