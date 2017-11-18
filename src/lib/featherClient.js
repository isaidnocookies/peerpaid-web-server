// This is an example of using the client on the server with Node.js.
// Rest default, and socketio optional function.
// Terminate will close the socket if you do use socketio
// Garbage collection tested with this method.

const feathers = require('@feathersjs/feathers');
const rest = require('@feathersjs/rest-client');
const superagent = require('superagent');
const auth = require('@feathersjs/authentication-client');

const io = require('socket.io-client');
const socketio = require('@feathersjs/socketio-client');


class simpleStorage {
  constructor() {
    this.items = {};
  }
  length() { return this.items.length; }
  getItem(key) { return this.items[key]; }
  setItem(key, value) { this.items[key] = value; }
  removeItem(key) { delete this.items[key]; }
  key(index) { return Object.keys(this.items)[index]; }
  clear() { Object.keys(this.items).forEach((key) => { delete this.items[key]; }); }
}

function createClient(transport, host, token) {

  var client = feathers();

  client.storage = new simpleStorage();
  // client.storage.setItem('feathers-jwt', token);



  client.configure(transport)
    .configure(auth(
      { storage: client.storage }
    ));

  client.terminate = function () {
    this.removeAllListeners();
    this.disable();
    this.storage.clear();
    this.storage = void 0;
  };
  return client;
}

function createRestClient(host, token) {

  var headers = void 0;
  if (token) headers = { 'authorization': 'Bearer ' + token };
  var client = createClient(rest(host).superagent(superagent, { 'headers': headers }), host, token);

  return client;
}

function createSocketIoClient(host, token) {
  var socket = io.connect(host);
  var client = createClient(socketio(socket), host, token);

  var clientTerminate = client.terminate;
  client.terminate = () => {
    socket.close();
    clientTerminate.bind(client)();
    socket = null;
  };

  return client;
}


module.exports = createRestClient;
module.exports.rest = createRestClient;
module.exports.socketio = createSocketIoClient;
