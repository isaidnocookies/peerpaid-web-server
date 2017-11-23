// notifications-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const notifications = new Schema({
    notifyType: { type: String },
    newUser: { type: String },
    newDocument: { type: String },
    newAvatar: { type: String },
    owner: { type: Schema.ObjectId },
  }, {
    timestamps: true
  });

  return mongooseClient.model('notifications', notifications);
};
