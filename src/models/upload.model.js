// upload-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const upload = new Schema({
    owner: { type: Schema.ObjectId, required: true },
    qquuid: { type: String, required: true },
    qqtotalfilesize: { type: String },
    qqfile: { type: String },
    fileName: { type: String },
    mimeType: { type: String },
    originalName: { type: String },
    files: { type: Object },
    file: { type: Object },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deleted: { type: Boolean, index: true },
    status: { type: String, enum: [
      'PENDING',
      'VERIFIED',
      'NON_VERIFIED',
      'REJECTED',
    ], required: true, default: 'PENDING' }
  });

  return mongooseClient.model('upload', upload);
};
