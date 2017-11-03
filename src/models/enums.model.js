var mongoose = require('mongoose')

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const enums = new Schema({
    // Begin Raw Transaction
    //countries: { type: String, required: true },
    //currencies: { type: String, required: true },
  });


  return mongooseClient.model('enums', enums);
};




