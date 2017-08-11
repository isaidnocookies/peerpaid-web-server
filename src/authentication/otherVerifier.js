'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var errors = require('feathers-errors');

var config = require('config');
var featherClient = require('../lib/featherClient');

var jwtverify = require('../lib/jwtverify');

var debug = (0, _debug2.default)('feathers-authentication-other:verify');

var CustomVerifier = function () {
  function CustomVerifier(app) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, CustomVerifier);

    this.app = app;
    this.options = options;

    this.verify = this.verify.bind(this);
  }

  _createClass(CustomVerifier, [{
    key: 'verify',
    value: function verify(req, done) {
      // no further validation, Custom Account is valid
      var dataServer = featherClient(config.get('dataServer'), '');

      dataServer.authenticate(req.body).then((result) => {

        var dest = { accessToken: result.accessToken };

        jwtverify.checkToken(dest, result.accessToken, () => {
          if (dest.jwt && dest.jwt._id) {
            dataServer.service('users').get(dest.jwt._id).then((result) => {
              dest.jwt.accessToken = dest.accessToken;
              dest.jwt[_this.options.entity + 'Id'] = dest.jwt._id;
              
              done(null, result, dest.jwt);
            });
          }
          else {
            console.log("Invalid Auth Token")
            done(new errors.NotAuthenticated('Invalid Auth Token'), null, null);
          }
        });
      }).catch((err) => {
        console.log("Not Authenticated:", err)
        done(new errors.NotAuthenticated(err.message), null, null);
      });


      // this.app.service('users').find({
      //   query: {
      //     $or: [
      //       { username: username && username.toLowerCase() },
      //       { email: email && email.toLowerCase() }
      //     ],
      //     $limit: 1,
      //   }
      // }).then(result => {
      //   var errorMessage = 'User not found';

      //   if (result.total >= 1) {
      //     var user = void 0;
      //     errorMessage = 'Invalid Login';
      //     result.data.forEach((userItem) => {
      //       if (passwordHash.verify(req.body.password, userItem.password)) {
      //         user = userItem;
      //       }
      //     });
      //     if (user) {
      //       user = {
      //         _id: user._id,
      //         permissions: user.permissions
      //       };
      //       done(null, user, user);
      //     }
      //     else {
      //       done(new Error(errorMessage), null, result);
      //     }
      //   }
      //   else {
      //     done(new Error(errorMessage), null, result);
      //   }
      // }, error => {
      //   done(error, null, error);
      // });

      //TODO: skip the api on the data server, and build new authentication piece


      // var method = 'post';
      // var url = '/users/login';

      // dsController.callApi(method, url, req.body, null, (error, result) => {
      //   console.log('Error:', error || result.error);

      //   result = (result && result.result) || result;

      //   var error = error || (result && result.error);

      //   jwtverify.checkToken(result, result.token, () => {
      //     console.log("TODO:DATA", result)
      //     done(error, result, result);
      //   })



      // });

    }
  }]);

  return CustomVerifier;
}();

exports.default = CustomVerifier;
module.exports = exports['default'];