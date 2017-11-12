#!/usr/bin/env node

const feathers = require('feathers');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');
const feathersSync = require('feathers-sync');
const handler = require('feathers-errors/handler');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
const service = require('feathers-mongodb');

const config = require('config');

var portA = 3021;
var portB = 3022;

var mongodbA = config.get("mongodb");
var mongodbB = mongodbA.replace("_web", "_data");

var nameA = "webToData";
var nameB = "dataToWeb";

var services = [
  { name: "bitcoin-transactions", dbName: "bitcointransactions" },
  { name: "currency-accounts", dbName: "currencyaccounts" },
  { name: "requests", dbName: "requests" },
  { name: "wallets", dbName: "wallets" },
]

// Create a feathers instance.
const appA = feathers()
  .configure(hooks())
  // Enable Socket.io
  .configure(socketio())
  // Enable REST services
  .configure(rest())

  .configure(feathersSync({
    size: 40 * 1024 * 1024,
    max: 50000,
    mubsub: {
      reconnectTries: 120,
      reconnectInterval: 1000,
      //authSource: 'admin'
    },
    db: mongodbA,
    collection: '_events'
  }))
  // Turn on JSON parser for REST services
  .use(bodyParser.json())
  // Turn on URL-encoded parser for REST services
  .use(bodyParser.urlencoded({ extended: true }));


function createA() {
  return new Promise(function (resolve) {
    console.log("Connecting A")
    // Connect to your MongoDB instance(s)
    MongoClient.connect(mongodbA, {
      reconnectTries: 120,
      reconnectInterval: 1000,
      authSource: 'admin'
    }).then(function (db) {
      console.log("connectA");
      // Connect to the db, create and register a Feathers service.
      services.forEach((serviceDef) => {
        console.log("CreateA", serviceDef.name)
        appA.use('/' + serviceDef.name, service({
          Model: db.collection(serviceDef.dbName),
          paginate: {
            default: 10,
            max: 50
          }
        }));

        appA.service(serviceDef.name).hooks({
          after: {
            all: [
              hook => {
                if (hook.params && hook.params.provider) {
                  hook.result.emitted = hook.params.provider;
                }
                return Promise.resolve(hook);
              }
            ]
          }
        });

      });

      // A basic error handler, just like Express
      appA.use(handler());

      // Start the server
      var server = appA.listen(portA);
      server.on('listening', function () {
        console.log('Feathers MongoDB service A running');
        resolve(server);
      });
    }).catch(function (error) {
      console.error(error);
    });
  }).catch(err => console.log);
}
// Create a feathers instance.
const appB = feathers()
  .configure(hooks())
  // Enable Socket.io
  .configure(socketio())
  // Enable REST services
  .configure(rest())

  .configure(feathersSync({
    size: 40 * 1024 * 1024,
    max: 50000,
    mubsub: {
      reconnectTries: 120,
      reconnectInterval: 1000,
      authSource: 'admin'
    },
    db: mongodbB,
    collection: '_events'
  }))
  // Turn on JSON parser for REST services
  .use(bodyParser.json())
  // Turn on URL-encoded parser for REST services
  .use(bodyParser.urlencoded({ extended: true }));



function createB() {
  return new Promise(function (resolve) {
    console.log("Connecting B")
    // Connect to your MongoDB instance(s)
    MongoClient.connect(mongodbB, {
      reconnectTries: 120,
      reconnectInterval: 1000,
      authSource: 'admin'
    }).then(function (db) {
      console.log("connectB");
      // Connect to the db, create and register a Feathers service.
      services.forEach((serviceDef) => {
        console.log("CreateB", serviceDef.name)
        appB.use('/' + serviceDef.name, service({
          Model: db.collection(serviceDef.dbName),
          paginate: {
            default: 10,
            max: 50
          }
        }));
        appB.service(serviceDef.name).hooks({
          after: {
            all: [
              hook => {
                if (hook.params && hook.params.provider) {
                  hook.result.emitted = hook.params.provider;
                }
                return Promise.resolve(hook);
              }
            ]
          }
        });
      });
      // A basic error handler, just like Express
      appB.use(handler());

      // Start the server
      var server = appB.listen(portB);
      server.on('listening', function () {
        console.log('Feathers MongoDB service B running');
        resolve(server);
      });
    }).catch(function (error) {
      console.error(error);
    });
  }).catch(err => console.log);

}

function connectServices(app, appDest) {
  var provider = app.provider;
  Object.keys(app.services).forEach(function (path) {
    var service = app.services[path];
    service._serviceEvents.forEach(function (event) {
      var serviceDest = appDest.service(path);
      service.on(event, (data) => {
        console.log(provider, path + ".on(" + event + ") = ", data._id);
        if (data.emitted === appDest.provider) {
          console.log(provider, "Emitted already");
          return;
        }
        switch (event) {
          case 'created':
            return new Promise((resolve, reject) => {
              var id = data._id || data.id
              serviceDest.create(data, { provider }).then(resolve).catch(reject);
            });
          case 'patched':
            return new Promise((resolve, reject) => {
              var id = data._id || data.id
              serviceDest.patch(id, data, { provider }).then(resolve).catch(err => {
                return new Promise(resolve, reject => {
                  setTimeout(() => {
                    //retry 
                    serviceDest.patch(id, data, { provider }).then(resolve).catch(reject);
                  }, 100);
                });
              });
            });
          case 'updated':
            return new Promise((resolve, reject) => {
              var id = data._id || data.id
              serviceDest.update(id, data, { provider }).then(resolve).catch(err => {
                return new Promise(resolve, reject => {
                  setTimeout(() => {
                    //retry 
                    serviceDest.update(data, { provider }).then(resolve).catch(reject);
                  }, 100);
                })
              });
            }).catch(error => console.log(path + 'A.updateErr:', error));
          case 'removed':
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                // always delay remove
                var id = data._id || data.id
                serviceDest.remove(id, { provider }).then(resolve).catch(err => {
                  return new Promise(resolve, reject => {
                    setTimeout(() => {
                      //retry 
                      serviceDest.remove(id, { provider }).then(resolve).catch(reject);
                    }, 100);
                  })
                });
              }, 500);
            });
          default:
          //do nothing
        }
      })
    });
  });
}

appA.provider = nameA;
appB.provider = nameB;

const promiseA = createA();
const promiseB = createB();

promiseA.then(result => {
  function runthrough() {

    if (!appB.service(services[0].name)) {
      setTimeout(() => {
        runthrough();
      }, 10);
      return;
    }
    connectServices(appA, appB)
  }
  runthrough();
}).catch(err => {
  console.log("promiseA Err:", err)
})

promiseB.then(result => {
  function runthrough() {
    if (!appA.service(services[0].name)) {
      setTimeout(() => {
        runthrough();
      }, 10);
      return;
    }

    connectServices(appB, appA);
  }
  runthrough();
}).catch(err => {
  console.log("promiseB Err:", err)
})