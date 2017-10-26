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
        'REQUEST_SEND_CURRENCY'
      ], required: true
    },
    webServerCantResolve: { type: Boolean },
    webServerDidResolve: { type: Boolean },
    dataServerCantResolve: { type: Boolean },
    dataServerDidResolve: { type: Boolean },
    btcServerCantResolve: { type: Boolean },
    btcServerDidResolve: { type: Boolean },
    token: { type: String, default: 'WEB' },
    owner: { type: Schema.ObjectId, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

    
    payload: { type: String },
    address: { type: String }
  });

  return mongooseClient.model('requests', requests);
};
