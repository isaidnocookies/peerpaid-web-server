'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dsController = require('../../lib/dataServerController');

var jwtverify = require('../../routes/jwtverify');

var debug = (0, _debug2.default)('feathers-authentication-personal:verify');

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

      var method = 'post';
      var url = '/users/login';

      req.body.username = req.body.username || req.body.email || req.body.emailAddress;


      dsController.callApi(method, url, req.body, null, (error, result) => {
        console.log('Error:', error || result.error);

        result = (result && result.result) || result;

        var error = error || (result && result.error);

        jwtverify.checkToken(result, result.token, () => {
          console.log("TODO:DATA", result)
          done(error, result, result);
        })



      });

    }
  }]);

  return CustomVerifier;
}();

exports.default = CustomVerifier;
module.exports = exports['default'];