const geoip = require('../lib/geoip');
const jsonWebToken = require('jsonwebtoken');


module.exports = function (options = {}) {

  this.app = options.app;

  return function preRender(req, res, next) {
    // console.log('pre-render middleware is running');
    // console.log('options', options);
    // console.log('req.body', req.body);
    // console.log('req.body.jwt', req.body.jwt);
    // console.log('query', req.query);
    // console.log('app.passport', app.passport);
    // console.log('webServer.passport:', webServer.passport);
    // console.log('typeof webServer.passport.verifyJWT:', typeof webServer.passport.verifyJWT);

    let userJwt = req.body.jwt;
    let userId = void 0;
    if (userJwt) {
      userId = jsonWebToken.decode(userJwt)._id;
    }
    var result = {};

    this.finish = () => {
      res.send(result);
      console.log('Geoip:: pre-render & geoip check ipCheck result: ', result.ipCheck);
    };

    function renderPage(userData) {
      // console.log('resultPayload after:', resultPayload);
      result.userResult = userData;
      this.finish();
      // console.log('passed user data to response!');
    }

    this.verifyComplete = (user) => {
      if (user) {
        // console.log('user:', user);
        this.app.service('users').get(user._id, { payload: { accessToken: userJwt } }).then(userData => {
          // console.log('userData after user get:', userData);
          // console.log('retrieved user data!');
          renderPage(userData);
        }).catch((err) => {
          // console.log('error in users get:', err);
          renderPage();
        });
      }
      else {
        renderPage();
      }
    };
    function verifyJWT(jwt) {

      this.app.passport.verifyJWT(jwt).then((userData) => {
        // console.log('passport userData:', userData);
        // console.log('passport userData._id:', userData._id);
        this.verifyComplete(userData);
      }).catch((err) => {
        // console.log('error in passport err - pre-render:56', err);
        this.verifyComplete();
      });
    }

    this.checkJwt = (jwt) => {
      if (jwt) {
        console.log('Geoip:: jwt exists');
        verifyJWT(jwt);
      } else {
        console.log('Geoip:: jwt does not exist');
        this.verifyComplete();
      }
    };

    //test new document 
    // function createExceptionDocs() {
    //   this.app.service('geoip-exceptions').create({ country: 'United States', state: 'Nevada', priority: 0, status: 'Open' }).then((data) => {
    //     console.log('return create data for geoip-ex:', data);
    //   });
    // }

    function checkIpStatus() {
      console.log('Geoip:: sent req to geoip to perform ip check');
      geoip(req).then((geoIpData) => {
        console.log('Geoip:: geoip check complete with ip: ', geoIpData.ipAddress);
        // console.log('after geoip data: ', geoIpData);
        // get and check fields in database for exceptions 
        this.app.service('geoip-exceptions').find({
          query: {
            $or: [
              { userId: userId },
              { userIp: geoIpData.ipAddress},
              { state: geoIpData.state },
              { country: geoIpData.country }
            ],
            $sort: { priority: -1 }
          },
          paginate: false
        }).then((exceptionsData) => {
          // console.log('return find data for geoip-ex:', exceptionsData);
          result.ipCheck = 'Open';
          function notExpired(expiredDate) {
            // console.log("Expired == ", expiredDate);
            return Date.now() < expiredDate.getTime();
          }
          if (exceptionsData) {
            //everything
            // this.finish();
            //data -- for (not expired, set ipcheck)
            var i;
            for (i in exceptionsData) {
              let exception = exceptionsData[i];
              // console.log('exData each:', exception.expires);
              // console.log('exData status each:', exception.status);

              if (!exception.expires || notExpired(exception.expires)) {
                // console.log('exData status each exprired == true:', exception.status);
                //expires = true > 
                result.ipCheck = exception.status;
                break;
              }
            }
            // Go Get User Info
            // next(() => {
            // this.finish();
            this.checkJwt(userJwt);
            // });
          }
          // this.checkJwt(userJwt);

        });
        //return 
        // this.finish();
      }).catch((err) => {
        console.log('geoip failed, request passed failed with err: ', err);
      });
    }

    checkIpStatus();
    // createExceptionDocs();
    // next();
  };
};
