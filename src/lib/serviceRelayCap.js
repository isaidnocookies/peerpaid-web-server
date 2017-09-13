const debug = require('./debug');
const queue = require('./queue');


function isEqual(newObject, oldObject) {
  var keys = Object.assign([], Object.keys(newObject), Object.keys(oldObject));
  keys = Array.from(new Set(keys));
  var equals = true;
  keys.forEach((key) => {
    if (equals) {
      var newVar = newObject[key];
      var oldVar = oldObject[key];

      if (typeof newVar === 'object') {
        if (!isEqual(newVar, oldVar)) {
          debug(`${key} does not equal, obj`);
          equals = false;
        }
      } else if (oldVar instanceof Date || newVar instanceof Date) {
        //Skip Date
      } else {
        var ov = oldVar && oldVar.toString();
        var nv = newVar && newVar.toString();
        equals = nv === ov;
        if (!equals) {
          debug(`${key} not equal ${ov} !== ${nv}`);
        }
      }
    }
  });
  return equals;
}


module.exports = function (app, localService, remoteService, updateCallback) {

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
    queue.set(`created:${serviceName}:${result._id}`, (resolve, reject) => {
      remoteService.create(result).then(result => {
        resolve();
        return result;
      }).catch(error => {
        debug(`Unable to create ${serviceName} on Remote`, error);
        reject();
      });
    });
    updateCallback(result);
  });

  remoteService.on('created', (result) => {
    localService.create(result).then(result => {
      debug(`Created ${serviceName} on Local`, result);
    }).catch(error => {
      debug(`unable to create ${serviceName} on Local`, error);
    });

  });

  localService.on('updated', (result) => {
    queue.set(`updated:${serviceName}:${result._id}`, (resolve, reject) => {
      remoteService.update(result._id, {
        $set: result
      }).then((result) => {
        debug(`Updated ${serviceName} on Remote`, result);
        resolve();
      }).catch(error => {
        debug(`Unable to update ${serviceName} on Remote`, error);
        reject();
      });
    });
    updateCallback(result);
  });

  remoteService.on('updated', (result) => {
    var runCount = 0;

    function runGetLocal() {
      localService.get(result._id).then(lresult => {
        if (!isEqual(result, lresult)) {
          debug('equal!!', result, '\n===\n', lresult);
          debug(`About to update ${serviceName}`);
          localService.update(result._id, {
            $set: result
          }).then((result) => {
            debug(`Updated ${serviceName} on Local`, result);
          }).catch(error => {

            debug(`Unable to update ${serviceName} on Local`, error);
          });
        } else {
          debug('equal??', result, '\n===\n', lresult);

        }
      }).catch(error => {
        if (runCount < 5){
          runCount++;
          setTimeout(runGetLocal, 1);
        }
      });
    }
    runGetLocal();
  });

  localService.on('removed', (result) => {
    queue.set(`removed:${serviceName}:${result._id}`, (resolve, reject) => {
      remoteService.remove(result._id).then((result) => {
        debug(`Removed ${serviceName} from Remote`);
      }).catch(error => {
        debug(`Unable to remove ${serviceName} from Remote`);
      });
    });
  });

  remoteService.on('removed', (result) => {
    localService.remove(result._id).then((result) => {
      debug(`Removed ${serviceName} from Local`);
    }).catch(error => {
      debug(`Unable to remove ${serviceName} from Local`);
    });
  });
};