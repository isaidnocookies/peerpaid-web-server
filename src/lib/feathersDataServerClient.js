var config = require('config');
var debug = require('./debug');
var jwtverify = require('./jwtverify');
var btckey = require('./btckey');

var featherClient = require('./featherClient');

var dataServer = featherClient.socketio(config.get('dataServer'));

var userObject = {
  _id: 'ffaaffaaffaaffaaffaaffaa',
  name: 'BitcoinServer',
  permissions: {
    btcTransactionServices: true
  }
};

var expireSeconds = 60 * 90;


function login() {
  var loginData = {
    strategy: 'other',
    username: 'webServer',
    password: 'MyPassword'
  };
  
  dataServer.authenticate(loginData).then(result => { }).catch(error => {
    debug('Error Authorizing:', error);
    
    setTimeout(() => {
      debug('Retry Login:');
      login();
    }, 1000);
  });
}

function reAuthenticate() {
  dataServer.logout().then(result => {
    login();
  }).catch(err => {
    login();
    debug('Unable to logout', err);
  });
}

login();


if (expireSeconds < 90) {
  throw new Error('expireSeconds should be more than 1.5 minutes to account for expiration');
}
setInterval(() => {
  reAuthenticate();
}, (expireSeconds - 60) * 1000);




module.exports = dataServer;