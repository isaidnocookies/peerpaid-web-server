// requests-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const requests = new Schema({
    request: {
      type: String,
      enum: [
        'GET_BITCOIN_WALLET',
        'REQUEST_BITCOIN_WALLET',
        'REQUEST_SEND_CURRENCY',
        'REQUEST_SEND_BITCOINS',
        'CREATE_DEPOSIT_ORDER',
        'CREATE_ENCRYPTED_FIAT_PAYLOAD',
        'BUY_BITCOINS',
        'CREATE_TRADE',
        'CREATE_PAYOUT_ORDER',
        'CLOSE_TRADE',
        'CREATE_TWO_FACTOR_AUTHENTICATION',
        'UPDATE_TWO_FACTOR_AUTHENTICATION'
      ], required: true
    },
    token: { type: String, default: 'WEB' },
    stage: { type: String, required: false },
    owner: { type: Schema.ObjectId, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

    payload: { type: Object },
    address: { type: String }
  });

  return mongooseClient.model('requests', requests);
};
