'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = init;

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.omit');

var _lodash4 = _interopRequireDefault(_lodash3);

var _verifier = require('./otherVerifier');

var _verifier2 = _interopRequireDefault(_verifier);

var _passportCustom = require('passport-custom');



function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var debug = (0, _debug2.default)('feathers-authentication-other');
var defaults = {
  name: 'other',
  server: {
  },
  passReqToCallback: true
};


function init() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function customAuth() {
    var app = this;
    var _super = app.setup;

    if (!app.passport) {
      throw new Error('Can not find app.passport. Did you initialize feathers-authentication before feathers-authentication-custom?');
    }

    // Construct customSettings for passport custom strategy
    var name = options.name || defaults.name;
    var authOptions = app.get('authentication') || {};
    var customOptions = authOptions[name] || {};
    var customSettings = (0, _lodash2.default)({}, defaults, customOptions, (0, _lodash4.default)(options, ['Verifier']));
    var Verifier = _verifier2.default;

    // plugin setup: register strategy in feathers passport
    app.setup = function () {
      // be sure feathers setup was called
      var result = _super.apply(this, arguments);
      var verifier = new Verifier(app, customSettings);

      if (!verifier.verify) {
        throw new Error('Your verifier must implement a \'verify\' function. It should have the same signature as function(request, user, done)');
      }

      // Register 'custom' strategy with passport
      // debug('Registering custom authentication strategy with options:', customSettings);
      app.passport.use(customSettings.name, new _passportCustom.Strategy(verifier.verify.bind(verifier)));
      app.passport.options(customSettings.name, customSettings); // do we need this ??

      return result;
    };
  };
}

// Exposed Modules
Object.assign(init, {
  defaults: defaults,
  Verifier: _verifier2.default,
});
module.exports = exports['default'];