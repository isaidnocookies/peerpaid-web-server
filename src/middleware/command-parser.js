
module.exports = function (options = {}) {
  return function commandParser(req, res, next) {
    var app = options.app;
    var data = Object.assign({} , req.body, req.query);
    app.service('command-proxy').create(data).then(result => {
      res.send(result);
    }).catch(error => {
      res.send(error);
    });
  };
};
