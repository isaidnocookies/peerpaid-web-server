var debug = require('./debug');
const queue = require('./queue');
const queueMiddleware = require('../middleware/queue');

const isEqual = require('./isEqual');
// debug = () => { };


module.exports = function (app, localService, remoteService, updateCallback, authority) {

  return; // Shorted out to ensure queue commands dont run.
  
  if (typeof updateCallback !== 'function' && authority === void 0) {
    authority = updateCallback;
  }
  var serviceName;

  if (typeof remoteService === 'function') {
    updateCallback = remoteService;
    remoteService = void 0;
  }

  if (remoteService) {
    serviceName = remoteService.path;
  }

  if (!serviceName) {
    serviceName = localService.path;
  }

  if (typeof updateCallback !== 'function') {
    throw new Error('Update callback must be a function');
  }


  localService.on('created', (result) => {
    queueMiddleware.createData(serviceName, result, result._id);

    // queue.set(`created:${serviceName}:${result._id}`, (resolve, reject) => {
    //   remoteService.create(result).then(result => {
    //     resolve();
    //     return result;
    //   }).catch(error => {
    //     debug(`Unable to create ${serviceName} on Remote`, error);
    //     reject();
    //   });
    // });
    updateCallback(result);
  });

  localService.on('updated', (result) => {
    queueMiddleware.updateData(serviceName, result, result._id);
    // queue.set(`updated:${serviceName}:${result._id}`, (resolve, reject) => {
    //   remoteService.update(result._id, {
    //     $set: result
    //   }).then((result) => {
    //     debug(`Updated ${serviceName} on Remote`, result);
    //     resolve();
    //   }).catch(error => {
    //     debug(`Unable to update ${serviceName} on Remote`, error);
    //     reject();
    //   });
    // });
    updateCallback(result);
  });

  localService.on('removed', (result) => {
    queueMiddleware.removeData(serviceName, result._id);
    // queue.set(`removed:${serviceName}:${result._id}`, (resolve, reject) => {
    //   remoteService.remove(result._id).then((result) => {
    //     debug(`Removed ${serviceName} from Remote`);
    //   }).catch(error => {
    //     debug(`Unable to remove ${serviceName} from Remote`);
    //   });
    // });
  });

  if (remoteService && !authority) {
    remoteService.on('created', (result) => {
      localService.create(result).then(result => {
        debug(`Created ${serviceName} on Local`);
      }).catch(error => {
        debug(`unable to create ${serviceName} on Local`, error);
      });

    });

    remoteService.on('updated', (result) => {
      var runCount = 0;

      function runGetLocal() {
        localService.get(result._id).then(lresult => {
          if (!isEqual(result, lresult)) {
            // debug('equal!!', result, '\n===\n', lresult);
            debug(`About to update ${serviceName}`);
            localService.update(result._id, {
              $set: result
            }).then((result) => {
              debug(`Updated ${serviceName} on Local`);
            }).catch(error => {

              debug(`Unable to update ${serviceName} on Local`, error);
            });
          } else {
            // debug('equal??', result, '\n===\n', lresult);

          }
        }).catch(error => {
          if (runCount < 5) {
            runCount++;
            setTimeout(runGetLocal, 1);
          }
        });
      }
      runGetLocal();
    });

    remoteService.on('removed', (result) => {
      localService.remove(result._id).then((result) => {
        debug(`Removed ${serviceName} from Local`);
      }).catch(error => {
        debug(`Unable to remove ${serviceName} from Local`);
      });
    });
  }
};