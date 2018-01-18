// geoip-exceptions-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const geoipExceptions = new Schema({
    userId: { type: Schema.ObjectId },
    ipAddress: { type: String },
    continent: { type: String },
    country: { type: String, required: true },
    state: { type: String },
    city: { type: String },
    postal: { type: String },
    priority: { type: Number, required: true },
    status: {
      type: String,
      enum: [
        'Tribe',
        'None',
        'Open'
      ],
      required: true
    },
    expires: Date
    // expires: { type: Date, default: Date.now, expires: 5 }//auto remove document
  }, {
    timestamps: true,
  });

  return mongooseClient.model('geoipExceptions', geoipExceptions);
};
