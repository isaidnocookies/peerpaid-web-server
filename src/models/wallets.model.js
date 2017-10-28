// wallet-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const wallets = new Schema({
    address: { type: String, required: true, unique: true },
    account: { type: String, required: false },
    amount:{type: Number, required: true},
    label: { type: String },
    txids: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

  return mongooseClient.model('wallets', wallets);
};
