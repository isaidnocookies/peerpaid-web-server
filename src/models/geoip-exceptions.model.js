// geoip-exceptions-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const geoipExceptions = new Schema({
    userId: { type: Schema.ObjectId },
    continent: { type: String },
    country: { type: String, required: true },
    state: {
      type: String,
      enum: [
        'Nevada',
        'California',
        'New York',
        'Michigan'
      ], 
      // required: true
    },
    city: { type: String },
    postal: { type: String },
    priority: { type: Number, required: true},
    expires: Date
    // expires: { type: Date, default: Date.now, expires: 5 }//auto remove document
  }, {
    timestamps: true,
  });

  return mongooseClient.model('geoipExceptions', geoipExceptions);
};
