var debug = require('./debug');

module.exports = function (newObject, oldObject) {
  var keys = Object.assign([], Object.keys(newObject), Object.keys(oldObject));
  keys = Array.from(new Set(keys));
  var equals = true;
  if (
    newObject._id && oldObject._id &&
    newObject._id.toString() === oldObject._id.toString()) {
    debug(`objects have different _id`);
    equals = false;
  }
  if (equals &&
    newObject.updatedAt && oldObject.updatedAt) {
    var newUpdatedAt = newObject.updatedAt;
    var oldUpdatedAt = oldObject.updatedAt;
    if (typeof newUpdatedAt === 'string') {
      newUpdatedAt = new Date(newUpdatedAt);
    }
    if (typeof oldUpdatedAt === 'string') {
      oldUpdatedAt = new Date(oldUpdatedAt);
    }
    if (newUpdatedAt.getTime() === oldUpdatedAt.getTime()) {
      debug('objects have same time and _id')
      equals = true;

    }
    else {

      debug(`objects have different time (${newObject})`);
      equals = false;
    }
  }
  keys.forEach((key) => {
    if (equals) {
      var newVar = newObject[key];
      var oldVar = oldObject[key];

      if (typeof newVar === 'object') {
        if (!isEqual(newVar, oldVar)) {
          debug(`${key} does not equal, obj`);
          equals = false;
        }
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
