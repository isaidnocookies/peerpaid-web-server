var config = require('config');
var featherClient = require('../lib/featherClient');
var webServer = featherClient.socketio(config.get('webServer'));
const geoip = require('../lib/geoip');

module.exports = function (options = {}) {

  this.app = options.app;

  return function preRender(req, res, next) {
    console.log('pre-render middleware is running');
    // console.log('options', options);
    console.log('req.body', req.body);
    // console.log('req.body.jwt', req.body.jwt);
    // console.log('query', req.query);
    // console.log('app.passport', app.passport);
    // console.log('webServer.passport:', webServer.passport);
    console.log('typeof webServer.passport.verifyJWT:', typeof webServer.passport.verifyJWT);

    let userJwt = req.body.jwt;

    var result = {};

    this.finish = () => {
      res.send(result);
      console.log('end result: ', result);
    };

    function renderPage(userData) {
      let resultPayload = {};
      if (userData) {
        // console.log('renderPage userData:', userData);
        resultPayload = { ...userData };
      }
      var test = { test: 'test' };
      resultPayload = Object.assign({}, resultPayload, test);
      // console.log('resultPayload after:', resultPayload);
      result.userResult = { ...resultPayload };
      this.finish();
      console.log('passed user data to response!');
    }

    this.verifyComplete = (user) => {
      if (user) {
        // console.log('user:', user);
        this.app.service('users').get(user._id, { payload: { accessToken: userJwt } }).then(userData => {
          // console.log('userData after user get:', userData);
          console.log('retrieved user data!');
          renderPage(userData);
        }).catch((err) => {
          console.log('error in users get:', err);
        });
      }
      else {
        renderPage();
      }
    };
    function verifyJWT(jwt) {

      this.app.passport.verifyJWT(jwt).then((userData) => {
        // webServer.passport.verifyJWT(userJwt).then((userData) => {
        // console.log('passport userData:', userData);
        console.log('passport userData._id:', userData._id);
        this.verifyComplete(userData);
      }).catch((err) => {
        console.log('error in passport err - pre-render:56', err);
        res.send({ noLogin: 'user did not attempt to log in' });
      });
      // app.service('/geoip').create(data)
    }

    this.checkJwt = (jwt) => {
      if (jwt) {
        console.log('jwt exists');
        verifyJWT(jwt);
      } else {
        console.log('jwt does not exist');
        this.finish();
      }
    };

    //working with State as check before checking jwt
    function getIpInfo() {
      console.log('send req to geoip and perform ip check');
      geoip(req).then((data) => {
        console.log('after geoip data: ', data);
        if (data.state === 'Nevada') {
          // result = {idCheck: 'Tribe'};
          result.ipCheck = 'Tribe';
          this.checkJwt(userJwt);
          // this.finish();`
        } else {
          this.finish();
        }
      });
    }

    function createExceptionDocs() {
      this.app.service('geoip-exceptions').create({ country: 'United States', state: 'Nevada', priority: 0 }).then((data) => {
        console.log('return create data for geoip-ex:', data);
      });
    }

    function checkIpStatus() {
      console.log('send req to geoip and perform ip check');
      geoip(req).then((geoIpData) => {
        console.log('after geoip data: ', geoIpData);
        // get and check fields in database for exceptions 
        this.app.service('geoip-exceptions').find({
          query: {
            $or: [
              // {state: 'Nevada'},
              // { state : { $in: ['Nevada', 'California'] }},
              { country: 'United States' }
            ],
            $sort: { priority: -1 }
          }
        }).then((exceptionsData) => {
          console.log('return find data for geoip-ex:', exceptionsData);
          if (exceptionsData) {
            result.ipCheck = 'Tribe';
            this.finish();
          } else {
            this.finish();
          }
        });

        //return 
        // this.finish();
      });
    }

    // getIpInfo();
    checkIpStatus();
    // createExceptionDocs();
    // next();
  };
};
