'use strict';


const authentication = require('feathers-authentication');

const jwt = require('./jwt');

const other = require('./other');

const jwtkey = require('../lib/jwtkey');

const jwtverify = require('../lib/jwtverify');


module.exports = function () {
  const app = this;
  const config = {
    secret: jwtkey.pub,
    strategies: [
      'other',
      'jwt'
    ],
    path: '/authentication',
    cookie: {
      enabled: false,
      name: 'feathers-jwt',
      httpOnly: false,
      secure: true
    },
    storageKey: 'feathers-jwt',
    jwt: {
      header: void 0,//{ typ: 'access' }, // by default is an access token but can be any type
      audience: void 0,//'https://yourdomain.com', // The resource server where the token is processed
      subject: void 0,//'anonymous', // Typically the entity id associated with the JWT
      issuer: void 0,//'feathers', // The issuing server, application or resource
      algorithm: 'RS256',
      expiresIn: '1d',
    },
    local: {
      entity: 'user',
      service: 'users',
      usernameField: 'email',
      passwordField: 'password'
    }
  };


  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(other());
  app.configure(jwt(config));

  app.service('authentication').hooks({
    before: {
      all: [
      ],
      create: [
        authentication.hooks.authenticate(config.strategies)
      ],
      remove: [
        authentication.hooks.authenticate('jwt')
      ]
    },
    after: {
      create: [

        hook => {
          hook.result = {accessToken:hook.params.payload.accessToken};

        }
      ]
    }
  });

  app.passport.verifyJWT = verifyJWT;
  app.passport.createJWT = createJWT;


  function verifyJWT(token) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // var VALID_KEYS = ['algorithms', 'audience', 'issuer', 'ignoreExpiration', 'ignoreNotBefore', 'subject', 'clockTolerance'];
    var settings = Object.assign({}, options.jwt);
    var secret = options.secret;

    // normalize algorithm to array

    if (settings.algorithm) {
      settings.algorithms = Array.isArray(settings.algorithm) ? settings.algorithm : [settings.algorithm];
      delete settings.algorithm;
    }

    return new Promise(function (resolve, reject) {
      if (!token) {
        return reject(new Error('token must provided'));
      }

      if (!secret) {
        return reject(new Error('secret must provided'));
      }

      var dest = {};
      jwtverify.checkToken(dest, token, () => {
        if (dest.jwt === void 0) {
          reject(new Error('Error Verifying token'));
        }
        else {
          resolve(dest.jwt);
        }
      });

    });
  }
  function createJWT() {
    var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // var settings = Object.assign({}, options.jwt);
    var secret = options.secret;

    return new Promise(function (resolve, reject) {

      if (!secret) {
        return reject(new Error('secret must provided'));
      }

      if (jwtverify.getKey) {
        var token = jwtverify.getKey(payload);
        if (token) {
          return resolve(token);
        }
        else {
          return reject(new Error('Unable to issue token'));
        }
      }
      else {
        return resolve('Unable to generate token');
      }
    });
  }

};




