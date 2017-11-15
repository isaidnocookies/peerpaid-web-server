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
        'REQUEST_SEND_BITCOINS'
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
