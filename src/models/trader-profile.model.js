// trader-profile-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const traderProfile = new Schema({
    username: { type: String, required: true, unique: true },
    confirmedTrades: [],
    emailConfirmed: { type: Boolean, default: false },
    phoneConfirmed: { type: Boolean, default: false },
    feedbackScore: { type: String, default: false },
    feedbacks: [],
  }, {
    timestamps: true
  });

  return mongooseClient.model('traderProfile', traderProfile);
};
