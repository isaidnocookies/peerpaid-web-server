var debug = require('../../lib/debug');
var performQueue = require('./performQueue');

var app;
var queueBank;
module.exports = function (appVar) {
  app = appVar;

  function init(app) {
    queueBank = app.service('queue-bank');

    if (!queueBank) {
      setTimeout(() => {
        init(app);
      }, 100);
    } else {

      var hasQueue = true;

      queueBank.on('created', result => {
        hasQueue = true;
      });

      var performingQueue = false;
      setInterval(() => {
        if (!hasQueue || performingQueue) return;
        performingQueue = true;
        performQueue(app, queueBank).then(result => {
          performingQueue = false;
        }).catch(err => {
          debug('Queue Error:', err);
          performingQueue = false;
        });

      }, 3000);

    }
  }



  setTimeout(() => {
    init(app);
  }, 100);

};


var LOCAL = 'LOCAL';
var DATA = 'DATA';
var CREATE = 'CREATE';
var UPDATE = 'UPDATE';
var REMOVE = 'REMOVE';


function addQueue(destination, actionType, service, payload, id) {
  executeQueue(destination, actionType, service, payload, id);
}

function executeQueue(destination, actionType, service, payload, id) {

  if (!queueBank) {
    setTimeout(() => {
      addQueue(destination, actionType, service, payload, id);
    }, 100);
  }
  else {


    debug(`addQueue: (${destination}, ${actionType}, ${service}, ${(id) ? id : 'payload'})`);

    var queueItem = {
      failureCount:0,
      destination,
      actionType,
      service,
      id,
      payload
    };


    queueBank.create(queueItem).then(result => {
      debug('Created Queue Item');
    }).catch(err => {
      delete queueItem.payload;
      queueBank.find({ query: queueItem }).then(result => {
        if (result.total === 0) {
        }
        else if (result.total === 1) {
          queueItem.payload = payload;
          queueBank.update(result._id, { $set: queueItem }).then(result => {
            debug('Updated Queue Item');
          }).catch(err => {
            debug('Update Queue Item Error:', err);
          });
        }
      });
    });
  }
}
function addQueueLocal(actionType, service, payload, id) {
  return addQueue(LOCAL, actionType, service, payload, id);
}

function addQueueData(actionType, service, payload, id) {
  return addQueue(DATA, actionType, service, payload, id);
}




module.exports.createLocal = (service, payload, id) => {
  addQueueLocal(CREATE, service, payload, id);
};

module.exports.createData = (service, payload, id) => {
  addQueueData(CREATE, service, null, id);
};



module.exports.updateLocal = (service, payload, id) => {
  addQueueLocal(UPDATE, service, payload, id);
};

module.exports.updateData = (service, payload, id) => {
  addQueueData(UPDATE, service, null, id);
};




module.exports.removeLocal = (service, id) => {
  addQueueLocal(REMOVE, service, null, id);
};

module.exports.removeData = (service, id) => {
  addQueueData(REMOVE, service, null, id);
};




