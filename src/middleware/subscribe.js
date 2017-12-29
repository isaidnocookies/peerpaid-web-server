module.exports = function (options = {}) {
  return function subscribe(req, res, next) {
    console.log('subscribe middleware is running');
    next();
  };
};
