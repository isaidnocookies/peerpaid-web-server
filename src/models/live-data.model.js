// liveData-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const liveData = new Schema({
    name: { type: String, required: true },
    data: { type: Object, required: true }
  }, {
    timestamps: true
  });

  return mongooseClient.model('liveData', liveData);
};
