var config = require('config');
var featherClient = require('../lib/featherClient');
var webServer = featherClient.socketio(config.get('webServer'));

module.exports = function (options = {}) {
  return function preRender(req, res, next) {
    console.log('pre-render middleware is running');
    // console.log('options', options);
    // console.log('options', req.body);
    // console.log('req.body.jwt', req.body.jwt);
    // console.log('query', req.query);
    // console.log('app.passport', app.passport);
    // console.log('webServer.passport:', webServer.passport);
    console.log('typeof webServer.passport.verifyJWT:', typeof webServer.passport.verifyJWT);

    let userJwt = req.body.jwt;
    var app = options.app;

    function renderPage(userData) {
      let resultPayload = {};
      if (userData) {
        // Gather User information
        // Add to result
        // resultPayload = Object.assign({}, userData);
        console.log('renderPage userData:', userData);
        resultPayload = {...userData};
      }
      // get generic stuff.
      // Including GEOIP
      var test = { test: 'test'};
      resultPayload = Object.assign({},resultPayload, test);
      console.log('resultPayload after:', resultPayload);
      res.send({ success: true, result: resultPayload });
    }

    function verifyComplete(user) {
      if (user) {
        console.log('user:', user);
        app.service('users').get(user._id, {payload: {accessToken: userJwt}}).then(userData => {
          console.log('userData after user get:', userData);
          renderPage(userData);
        }).catch((err) => {
          console.log('error in users get');
        });
      }
      else {
        renderPage();
      }
    }
    app.passport.verifyJWT(userJwt).then((userData) => {
    // webServer.passport.verifyJWT(userJwt).then((userData) => {
      console.log('passport userData:', userData);
      console.log('passport userData._id:', userData._id);
      verifyComplete(userData);
    }).catch((err) => {
      console.log('error in passport err:', err);
      verifyComplete();
    });
    // app.service('/geoip').create(data)

    // next();
  };
};
