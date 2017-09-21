// queueBank-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

var uuid = require('uuid');
var ObjectId = require('mongoose/lib/schema/objectid');


module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema, Types } = mongooseClient;
  const queueBank = new Schema({
    actionType: {
      type: String,
      enum: [
        'CREATE',
        'UPDATE',
        'REMOVE'
      ], required: true,
      index: true
    },
    destination: {
      type: String,
      enum: [
        'LOCAL',
        'DATA'
      ], required: true,
      index: true
    },
    id: { type: Schema.ObjectId, index: true, required: true },
    failureCount: { type: Number, required: true, defalut: 0 },
    service: { type: String, required: true },
    payload: { type: Object },
    updateGuid: { type: String, index: true, default: uuid },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  queueBank.index({ actionType: 1, destination: 1, service: 1, id: 1 }, { unique: true });

  return mongooseClient.model('queueBank', queueBank);
};
