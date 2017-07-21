var config = require('config');
var fs = require('fs')
var path = require('path')

var cert;

var certPath = path.join(__dirname,path.join("../" , config.get("jwt.key")));
if (fs.existsSync(certPath)){
  cert = fs.readFileSync(certPath);
}
var pub = fs.readFileSync(path.join(__dirname,path.join("../", config.get("jwt.pub"))));


module.exports.cert = cert;
module.exports.pub = pub; 