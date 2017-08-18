var config = require('config');
var featherClient = require('./featherClient');

var jwtdecode = require('jwt-decode');

var dataServer = featherClient.socketio(config.get('dataServer'));

dataServer.authenticate({
  strategy: "other",
  username: "volure",
  password: "MyPassword"
}).then(response => {
  console.log('Authenticated!', response);
  return dataServer.passport.verifyJWT(response.accessToken);
})
.then(payload => {
  console.log('JWT Payload', payload);
  return dataServer.service('users').get(payload._id);
}) 
.then(user => {
  console.log("User!", user)
  dataServer.set('user', user);
  console.log('User', dataServer.get('user'));
})
.catch(function(error){
  console.error('Error authenticating!', error);
});
//  .then(payload => {
//   console.log("Incoming Token: ", dataServer.storage.getItem("feathers-jwt"))
//   console.log("Login:", payload)
//   dataServer.service('users').find().then((result) => {
//     console.log("Results:", results);
//     user = jwtdecode(payload.accessToken);

//     dataServer.service('users').get(user._Id).then(result => {
//       console.log("Result:User", result);
//     })
//   })

// })

dataServer.on("connected", (socket) => {
  console.log("Connected:", socket);
})
dataServer.on("disconnected", (socket) => {
  console.log("Disconnected:", socket)
})
dataServer.service("users").on("created", (user) => {
  console.log("###################################")
  console.log("############## users ##############")
  console.log("###################################")
  console.log("User:", user);
})
console.log("Watcher Listening")