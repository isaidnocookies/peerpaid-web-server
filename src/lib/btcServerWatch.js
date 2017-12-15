var config = require('config');
var featherClient = require('./featherClient');

var jwtdecode = require('jwt-decode');

var debug = require('./debug');

var btcServer = featherClient.socketio(config.get('btcServer'));



// btcServer.authenticate({
//   strategy: "other",
//   username: "volure",
//   password: "MyPassword"
// }).then(response => {
//   debug('Authenticated! btcServer', response);
//   return btcServer.passport.verifyJWT(response.accessToken);
// })
// .then(payload => {
//   debug('JWT Payload btcServer', payload);
//   return btcServer.service('bitcoin-transactions').get();
// })
// .then(bitcoin => {
//   debug("Bitcoin! btcServer", bitcoin)
//   btcServer.set('bitcoin', bitcoin);
//   debug('Bitcoin', btcServer.get('bitcoin-transactions'));
// })
// .catch(function(error){
//   console.error('Error authenticating! btcServer', error);
// });

btcServer.on('connected', (socket) => {
  debug('Connected:', socket);
});
btcServer.on('disconnected', (socket) => {
  debug('Disconnected:', socket);
});
btcServer.service('bitcoin-transactions').on('created', (bitcoin) => {
  debug('###################################');
  debug('############## bitcoin ##############');
  debug('###################################');
  debug('Bitcoin:', bitcoin);
});
debug('Watcher Listening bitcoin-transactions');