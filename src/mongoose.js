
const mongoose = require('mongoose');
const config = require('config');
const fs = require('fs')
module.exports = function () {
  const app = this;
  const mongoUrl = app.get('mongodb');
  mongoose.Promise = global.Promise;
  var mongoOptions = {
    reconnectTries: 120,
    reconnectInterval: 1000,
    authSource: 'admin',
    useMongoClient: true,
  };

  if ((['production','devServer','productionPrep'].indexOf(process.env.NODE_ENV) >= 0) && config.has('mongoCert')) {
    var cert = fs.readFileSync(config.get("mongoCert"), 'utf8');
    mongoOptions.ssl = true;
    mongoOptions.sslValidate = false;
    mongoOptions.sslKey = cert;
    mongoOptions.sslCert = cert;
    mongoOptions.sslCA = cert;
  }
  var promise = mongoose.connect(mongoUrl, mongoOptions);

  app.set('mongoClient', promise);
  app.set('mongooseClient', mongoose);
};
