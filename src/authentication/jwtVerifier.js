'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var errors = require('feathers-errors');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var debug = (0, _debug2.default)('feathers-authentication-jwt:verify');

var config = require('config');
var featherClient = require('../lib/featherClient');

var jwtverify = require('../lib/jwtverify');

var JWTVerifier = function () {
  function JWTVerifier(app) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, JWTVerifier);

    this.app = app;
    this.options = options;
    this.service = typeof options.service === 'string' ? app.service(options.service) : options.service;

    if (!this.service) {
      throw new Error('options.service does not exist.\n\tMake sure you are passing a valid service path or service instance and it is initialized before feathers-authentication-jwt.');
    }

    this.verify = this.verify.bind(this);
  }

  _createClass(JWTVerifier, [{
    key: 'verify',
    value: function verify(req, done) {
      var _this = this;

      var authHeader = req.headers.authorization;
      var bodyToken = req.body['accessToken'];


      var token = authHeader || bodyToken || '';

      if (/^Bearer /.test(token)) {
        token = token.substr(7);
      }

      var dest = {};
      jwtverify.checkToken(dest, token, () => {
        if (dest.jwt === void 0) {
          console.log("JWTVerifier--")

          done(new errors.NotAuthenticated('Invalid Auth Token'), null, {});
        }
        else {
          // var dataServer = featherClient(config.get('dataServer'), token);

          // dataServer.service('users').get(dest.jwt._id).then((result) => {
          //   debug('user', result);
          var entity = Object.assign({}, dest.jwt, {});
          dest.jwt.accessToken = token;
          dest.jwt[_this.options.entity + 'Id'] = dest.jwt._id;

          done(null, entity, dest.jwt);
          // }).catch((error) => {
          //   error.other = 'fail';
          //   console.log("JWTVerifier-", error)

          //   debug('userFail', error);

          //   done(error, null, dest.jwt);
          // });
        }
      });


      // debug('Received JWT payload', payload);

      // var id = payload[this.options.entity + 'Id'];

      // if (id === undefined) {
      //   debug('JWT payload does not contain ' + this.options.entity + 'Id');
      //   return done(null, {}, payload);
      // }

      // debug('Looking up ' + this.options.entity + ' by id', id);

      // this.service.get(id).then(function (entity) {
      //   var newPayload = _defineProperty({}, _this.options.entity + 'Id', id);
      //   return done(null, entity, newPayload);
      // }).catch(function (error) {
      //   debug('Error populating ' + _this.options.entity + ' with id ' + id, error);
      //   return done(null, {}, payload);
      // });
    }
  }]);

  return JWTVerifier;
}();

exports.default = JWTVerifier;
module.exports = exports['default'];









// 'use strict';

// Object.defineProperty(exports, '__esModule', {
//   value: true
// });

// var errors = require('feathers-errors');

// var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

// var _debug = require('debug');

// var _debug2 = _interopRequireDefault(_debug);

// function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }


// var jwtverify = require('../lib/jwtverify');

// var debug = (0, _debug2.default)('feathers-authentication-other:verify');

// var CustomVerifier = function () {
//   function CustomVerifier(app) {
//     var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

//     _classCallCheck(this, CustomVerifier);

//     this.app = app;
//     this.options = options;

//     this.verify = this.verify.bind(this);
//   }

//   _createClass(CustomVerifier, [{
//     key: 'verify',
//     value: function verify(req, done) {
//       // no further validation, Custom Account is valid

//       var authHeader = req.headers.authorization;
//       var bodyToken = req.body['accessToken'];


//       var token = authHeader || bodyToken || '';


//       if (/^Bearer /.test(token)) {
//         token = token.substr(7);
//       }

//       var dest = {};
//       jwtverify.checkToken(dest, token, () => {
//         if (dest.jwt === void 0) {
//           done(new errors.NotAuthenticated('Invalid Auth Token'), null, {});
//         }
//         else {
//           debug('dest.jwt', dest.jwt);
//           this.app.service('users').get(dest.jwt._id).then((result) => {
//             done(null, result, dest.jwt);
//           }).catch ((error) => {
//             done (error, null, dest.jwt)
//           })

//         }
//       });










//       // req.body.username = req.body.username || req.body.email || req.body.emailAddress;
//       // this.app.service('users').find({
//       //   query: {
//       //     username:req.body.username || req.body.email,
//       //     password:req.body.password,
//       //     $limit: 1,
//       //   }
//       // });

//       //TODO: skip the api on the data server, and build new authentication piece


//       // var method = 'post';
//       // var url = '/users/login';

//       // dsController.callApi(method, url, req.body, null, (error, result) => {

//       //   result = (result && result.result) || result;

//       //   var error = error || (result && result.error);

//       //   jwtverify.checkToken(result, result.token, () => {
//       //     done(error, result, result);
//       //   })



//       // });

//     }
//   }]);

//   return CustomVerifier;
// }();

// exports.default = CustomVerifier;
// module.exports = exports['default'];