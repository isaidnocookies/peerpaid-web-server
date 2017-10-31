module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const paymentMethods = new Schema({
    method: { type: String, required: true, unique: true },
    currency: [{ type: String, required: false }],
    details: { type: String, required: false },
    items: [{ type: String, required: false }],
  });

  return mongooseClient.model('payment-method', paymentMethods);
};

