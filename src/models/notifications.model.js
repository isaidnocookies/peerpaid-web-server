// notifications-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const notifications = new Schema({
    owner: { type: Schema.ObjectId, index: true },
    notifyType: { type: String },
    notifyMessage: { type: String },
    infoLink: { type: String },
    viewed: { type: Boolean, index: true },
    deleted: { type: Boolean, index: true }
  }, {
    timestamps: true
  });

  return mongooseClient.model('notifications', notifications);
};
