const debug = require('./debug');

var updateQueue = {};

var syncBusy = false;

function syncServer() {
  return; //shorted out syncServer to ensure these changes never run.
  if (syncBusy) return;
  syncBusy = true;
  var uQueue = updateQueue;
  updateQueue = {};

  function performSync(syncQueue) {


    function makePromise(key) {
      debug('Enqueue:', key);
      uQueue[key].attempts = 0;
      return new Promise(uQueue[key]).then(result => {
        delete uQueue[key];
        return result;
      }).catch(err => {
        uQueue[key].attempts++;
        if (uQueue[key].attempts >= 5) {
          debug('Trouble executing updateQueue item:', key, uQueue[key].toString());
          delete uQueue[key];
        }
        return err;
      });
    }

    var createPromises = [];
    Object.keys(uQueue).forEach((key) => {
      if (key.match(/create.*/g)) {
        createPromises.push(makePromise(key));
      }
    });

    function createTimeout() {
      return new Promise((resolve, reject) => {
        var done = false;
        var timeoutInt = setInterval(() => {
          if (Object.keys(uQueue).length === 0) {
            clearInterval(timeoutInt);
            resolve();
            done = true;
          }
        }, 100);

        setTimeout(() => {
          clearInterval(timeoutInt);
          if (!done) debug('Sync Timeout', Object.keys(syncQueue));
          reject('Sync Taking Too Long.');
          updateQueue = Object.assign({}, syncQueue, updateQueue);
        }, 10000);
      });
    }

    function processUpdates() {
      var updatePromises = [];
      Object.keys(uQueue).forEach((key) => {
        updatePromises.push(makePromise(key));
      });
      Promise.all(updatePromises).then(result => {
        syncBusy = false;
      }).catch(err => {
        syncBusy = false;
        debug('Update Sync failed:', err);
      });
    }

    Promise.all(createPromises).then(result => {
      processUpdates();
    }).catch(err => {
      processUpdates();
      debug('Create Sync failed:', err);
    });

  }
  performSync(uQueue);
}

setInterval(() => {
  syncServer();
}, 1000);


module.exports.set = (key, promiseFunc) => {
  debug('SetQueue:',key);
  updateQueue[key] = promiseFunc;
};

module.exports.unset = (key) => {
  delete updateQueue[key];
};