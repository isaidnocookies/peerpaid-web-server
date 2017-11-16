var debug = require('./debug');

module.exports = function (newObject, oldObject) {
  var keys = Object.assign([], Object.keys(newObject), Object.keys(oldObject));
  var isNewer = false;
  if (newObject.updatedAt && oldObject.updatedAt) {
    var newUpdatedAt = newObject.updatedAt;
    var oldUpdatedAt = oldObject.updatedAt;
    if (typeof newUpdatedAt === 'string') {
      newUpdatedAt = new Date(newUpdatedAt);
    }
    if (typeof oldUpdatedAt === 'string') {
      oldUpdatedAt = new Date(oldUpdatedAt);
    }
    if (newUpdatedAt.getTime() > oldUpdatedAt.getTime()) {
      isNewer = true;

    }
    else {

      debug(`objects have different time (${newObject})`);
      isNewer = false;
    }
  }
  else if (newObject.updatedAt && !oldObject.updatedAt) {
    isNewer = true;
  }
  return isNewer;
}
