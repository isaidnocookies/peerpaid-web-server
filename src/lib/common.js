const debug = require('./debug');
var common = {};

common.getFirstItem = (results) => {
  var item = results;
  if (item) {
    if (item.total && item.data && item.data.length > 0) {
      item = item.data[0];
    }
    else if (item.total === 0 && (results.data === void 0 || results.data.length === 0)) {
      item = void 0;
    }
  }
  return item;
};


module.exports = common;

