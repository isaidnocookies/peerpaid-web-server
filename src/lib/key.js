var config = require('config');
var fs = require('fs');
var path = require('path');


module.exports = function (configName) {

  var rootPath = '/dev/null';

  if (config.has(configName)) {
    rootPath = path.join(__dirname, path.join('../', config.get(configName)));
  }

  var cert;

  var certPath = rootPath + '.key';
  if (fs.existsSync(certPath)) {
    cert = fs.readFileSync(certPath);
  }

  var pem;

  var pemPath = rootPath + '.pem';
  if (fs.existsSync(pemPath)) {
    pem = fs.readFileSync(pemPath);
  }

  var pub;

  var pubPath = rootPath + '.pub';
  if (fs.existsSync(pubPath)) {
    pub = fs.readFileSync(pubPath);
  }


  var pub2;
  var pub2Path = rootPath + '.pub2';
  if (fs.existsSync(pub2Path)) {
    pub2 = fs.readFileSync(pub2Path);
  }


  var result = {};

  result.cert = cert;
  result.pub = pub;
  result.pem = pem;
  result.pub2 = pub2;

  return result;
};