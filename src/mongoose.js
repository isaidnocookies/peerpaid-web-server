
const mongoose = require('mongoose');


module.exports = function () {
  const app = this;
  const mongoUrl = app.get('mongodb');
  mongoose.Promise = global.Promise;
  var promise = mongoose.connect(mongoUrl, {
    reconnectTries: 120,
    reconnectInterval: 1000,
    authSource: 'admin',
    useMongoClient: true
  });

  app.set('mongoClient', promise);
  app.set('mongooseClient', mongoose);
};
