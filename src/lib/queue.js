const debug = require('./debug');

var updateQueue = {};

var syncBusy = false;

function syncServer() {
  if (syncBusy) return;
  syncBusy = true;
  var uQueue = updateQueue;
  updateQueue = {};

  function performSync(syncQueue) {

    var promises = Object.keys(uQueue).map((key) => {
      debug('Enqueue:', key);
      uQueue[key].attempts = 0;
      return new Promise(uQueue[key]).then(result => {
        delete uQueue[key];
        return result;
      }).catch(err => {
        uQueue[key].attempts++;
        if (uQueue[key].attempts >= 5){
          debug('Trouble executing updateQueue item:', key, uQueue[key].toString());
          delete uQueue[key];
        }
        return err;
      });
    });

    var timeout = new Promise((resolve, reject) => {
      var timeoutInt = setInterval(() => {
        if (Object.keys(uQueue).length === 0) {
          clearInterval(timeoutInt);
          resolve();
        }
      }, 100);

      setTimeout(() => {
        clearInterval(timeoutInt);
        reject('Sync Taking Too Long.');
      }, 10000);
    });

    promises.push(timeout);
    Promise.all(promises).then(result => {
      syncBusy = false;
    }).catch(err => {
      syncBusy = false;
      debug('Sync failed:', err);
    });

  }
  performSync(uQueue);
}

setInterval(() => {
  syncServer();
}, 1000);


module.exports.set = (key, promiseFunc) => {
  updateQueue[key] = promiseFunc;
};

module.exports.unset = (key) => {
  delete updateQueue[key];
};