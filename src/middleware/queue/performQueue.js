const uuid = require('uuid');
const debug = require('../../lib/debug');
const dataServerClient = require('../../lib/feathersDataServerClient');


const CREATE = 'CREATE';
const UPDATE = 'UPDATE';
const REMOVE = 'REMOVE';


const DATA = 'DATA';
const LOCAL = 'LOCAL';

module.exports = (app, queueBank) => {

  var guid = uuid();
  var queueBatch = dataServerClient.service('queue-batch');


  return new Promise((rootResolve, rootReject) => {

    var rootPromise = new Promise((resolve, reject) => {
      queueBank.patch(null, { updateGuid: guid }).then(result => {

        function findCreateCommands(destination, secondPass) {
          return new Promise((resolve, reject) => {
            var findQuery = {
              updateGuid: guid,
              actionType: CREATE,
              destination,
              $select: ['_id', 'id', 'service']
            };
            queueBank.find({ query: findQuery, paginate: false }).then(result => {
              var promises = [];
              var queueBuffer = {};
              var completedServices = [];
              result.forEach((queueItem) => {
                var service = queueBuffer[queueItem.service] = queueBuffer[queueItem.service] || [];
                service.push(queueItem.id);
              });
              promises = Object.keys(queueBuffer).map((serviceName) => {
                var lQuery = {
                  _id: {
                    $in: queueBuffer[serviceName]
                  }
                };
                return app.service(serviceName).find({ query: lQuery, paginate: false }).then(serviceCreateObjects => {
                  return queueBatch.create({
                    method: CREATE,
                    serviceName,
                    payload: serviceCreateObjects
                  }).then(result => {
                    delete queueBuffer[serviceName];
                    completedServices.push(serviceName);
                  }).catch(err => {
                    debug('Unable to execute queueBatch:', err);
                  });
                  // return dataServerClient.service(serviceName).create(serviceCreateObjects).then(result => {
                  //   delete queueBuffer[serviceName];
                  //   created.push(serviceName);
                  // }).catch(err => {
                  //   debug('Unable to create elements:', serviceName, err);
                  // });
                }).catch(err => {
                  debug('Unable to find elements:', serviceName, err);
                });
              });

              promises.push(Promise.resolve());

              Promise.all(promises).then(result => {
                findQuery.service = { $in: completedServices };
                queueBank.remove(null, { query: findQuery }).then(result => {
                  if (!secondPass) {
                    queueBank.patch(null, { $set: { updateGuid: guid } }, { query: { actionType: CREATE, destination } }).then(result => {
                      resolve(findCreateCommands(destination, true)); // Catch any straggling creates so our updateGuid updates arent orphaned
                    }).catch(err => {
                      reject(err);
                    });
                  }
                  else {
                    resolve();
                  }
                }).catch(err => {
                  reject(err);
                });
              }).catch(err => {
                reject(err);
              });

            }).catch(err => {
              reject(err);
            });
          });
        }

        function findUpdateCommands(destination) {
          return new Promise((resolve, reject) => {
            var findQuery = {
              updateGuid: guid,
              actionType: UPDATE,
              destination,
              $select: ['_id', 'id', 'service']
            };
            queueBank.find({ query: findQuery, paginate: false }).then(result => {
              var promises = [];
              var queueBuffer = {};
              var completedServices = [];

              result.forEach((queueItem) => {
                var service = queueBuffer[queueItem.service] = queueBuffer[queueItem.service] || [];
                service.push(queueItem.id);
              });
              promises = Object.keys(queueBuffer).map((serviceName) => {
                var lQuery = {
                  _id: {
                    $in: queueBuffer[serviceName]
                  }
                };
                return app.service(serviceName).find({ query: lQuery, paginate: false }).then(serviceCreateObjects => {
                  return queueBatch.create({
                    method: UPDATE,
                    serviceName,
                    payload: serviceCreateObjects
                  }).then(result => {
                    delete queueBuffer[serviceName];
                    completedServices.push(serviceName);
                  }).catch(err => {
                    debug('Unable to create elements:', serviceName, err);
                  });
                  // return dataServerClient.service(serviceName).update(null, serviceCreateObjects).then(result => {
                  //   delete queueBuffer[serviceName];
                  //   created.push(serviceName);
                  // }).catch(err => {
                  //   debug('Unable to create elements:', serviceName, err);
                  // });
                }).catch(err => {
                  debug('Unable to find elements:', serviceName, err);
                });
              });

              promises.push(new Promise((resolve, reject) => {
                resolve();
              }));

              Promise.all(promises).then(result => {
                findQuery.service = { $in: completedServices };
                queueBank.remove(null, { query: findQuery }).then(result => {
                  queueBank.patch(null, { $set: { updateGuid: guid } }, { query: { actionType: CREATE, destiantion: DATA } }).then(result => {
                    resolve();
                  }).catch(err => {
                    reject(err);
                  });
                }).catch(err => {
                  reject(err);
                });
              }).catch(err => {
                reject(err);
              });

            }).catch(err => {
              reject(err);
            });
          });
        }


        function findRemoveCommands(destination) {
          return new Promise((resolve, reject) => {
            var findQuery = {
              updateGuid: guid,
              actionType: REMOVE,
              destination,
              $select: ['_id', 'id', 'service']
            };
            queueBank.find({ query: findQuery, paginate: false }).then(result => {
              var promises = [];
              var queueBuffer = {};
              var completedServices = [];

              result.forEach((queueItem) => {
                var service = queueBuffer[queueItem.service] = queueBuffer[queueItem.service] || [];
                service.push(queueItem.id);
              });
              promises = Object.keys(queueBuffer).map((serviceName) => {
                var lQuery = {
                  _id: {
                    $in: queueBuffer[serviceName]
                  }
                };
                return app.service(serviceName).find({ query: lQuery, paginate: false }).then(serviceCreateObjects => {
                  return queueBatch.create({
                    method: REMOVE,
                    serviceName,
                    payload: serviceCreateObjects
                  }).then(result => {
                    delete queueBuffer[serviceName];
                    completedServices.push(serviceName);
                  }).catch(err => {
                    debug('Unable to create elements:', serviceName, err);
                  });
                  // return dataServerClient.service(serviceName).update(null, serviceCreateObjects).then(result => {
                  //   delete queueBuffer[serviceName];
                  //   created.push(serviceName);
                  // }).catch(err => {
                  //   debug('Unable to create elements:', serviceName, err);
                  // });
                }).catch(err => {
                  debug('Unable to find elements:', serviceName, err);
                });
              });

              promises.push(new Promise((resolve, reject) => {
                resolve();
              }));

              Promise.all(promises).then(result => {
                findQuery.service = { $in: completedServices };
                queueBank.remove(null, { query: findQuery }).then(result => {
                  queueBank.patch(null, { $set: { updateGuid: guid } }, { query: { actionType: CREATE, destiantion: DATA } }).then(result => {
                    resolve();
                  }).catch(err => {
                    reject(err);
                  });
                }).catch(err => {
                  reject(err);
                });
              }).catch(err => {
                reject(err);
              });

            }).catch(err => {
              reject(err);
            });
          });
        }


        findCreateCommands(DATA).then(result => {
          findUpdateCommands(DATA).then(result => {
            findRemoveCommands(DATA).then(result => {
              resolve();
            }).catch(err => {
              reject(err);
            });
          }).catch(err => {
            reject(err);
          });
        }).catch(err => {
          reject();
        });
      }).catch(err => {
        debug('Err:', err);
        reject(err);
      });

    });

    // First promise, last resolve.
    rootPromise.then(result => {
      rootResolve();
    }).catch(err => {
      rootReject(err);
    });
  });
};