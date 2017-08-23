var config = require('config');
var featherClient = require('./featherClient');

var jwtdecode = require('jwt-decode');

var btcServer = featherClient.socketio(config.get('btcServer'));

// btcServer.authenticate({
//   strategy: "other",
//   username: "volure",
//   password: "MyPassword"
// }).then(response => {
//   console.log('Authenticated! btcServer', response);
//   return btcServer.passport.verifyJWT(response.accessToken);
// })
// .then(payload => {
//   console.log('JWT Payload btcServer', payload);
//   return btcServer.service('bitcoin-transactions').get();
// })
// .then(bitcoin => {
//   console.log("Bitcoin! btcServer", bitcoin)
//   btcServer.set('bitcoin', bitcoin);
//   console.log('Bitcoin', btcServer.get('bitcoin-transactions'));
// })
// .catch(function(error){
//   console.error('Error authenticating! btcServer', error);
// });

btcServer.on("connected", (socket) => {
  console.log("Connected:", socket);
})
btcServer.on("disconnected", (socket) => {
  console.log("Disconnected:", socket)
})
btcServer.service("bitcoin-transactions").on("created", (bitcoin) => {
  console.log("###################################")
  console.log("############## bitcoin ##############")
  console.log("###################################")
  console.log("Bitcoin:", bitcoin);
})
console.log("Watcher Listening bitcoin-transactions")