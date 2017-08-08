// This is an example of using the client on the server with Node.js.
// Most of the code is the same for the browser with the exception
// of how modules are imported and configured. It depends on how you choose
// to load them. Refer to the client section of docs.feathersjs.com for more detail.
//

const feathers = require('feathers/client');
const rest = require('feathers-rest/client');
const superagent = require('superagent');
const hooks = require('feathers-hooks');
const localStorage = require('localstorage-memory');
const auth = require('feathers-authentication-client');


function createClient(host, token) {

  var client = feathers();

  localStorage.setItem('feathers-jwt', token);

  client.configure(hooks())
    .configure(rest(host).superagent(superagent, { 'headers': { 'authorization': localStorage.getItem('feathers-jwt') } }))
    .configure(auth({ storage: localStorage }));

  // client.service('users').get('5987943b2d071018cad6971b')
  //   .then(user => {
  //     client.set('user', user);
  //     console.log('User', client.get('user'));
  //   })
  //   .catch(function (error) {
  //     console.error('Error authenticating!', error);
  //   });

  return client;

}

module.exports = createClient;