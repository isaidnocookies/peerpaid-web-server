'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = init;

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.omit');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.pick');

var _lodash6 = _interopRequireDefault(_lodash5);

var _verifier = require('./jwtVerifier');

var _verifier2 = _interopRequireDefault(_verifier);

var _passportJwt = require('passport-jwt');
var _passportCustom = require('passport-custom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug2.default)('feathers-authentication-jwt');
var defaults = {
  name: 'jwt',
  bodyKey: 'accessToken'
};

var KEYS = ['secret', 'header', 'entity', 'service', 'passReqToCallback', 'session', 'jwt'];

function init() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function jwtAuth() {
    var app = this;
    var _super = app.setup;

    if (!app.passport) {
      throw new Error('Can not find app.passport. Did you initialize feathers-authentication before feathers-authentication-jwt?');
    }

    var authOptions = app.get('auth') || app.get('authentication') || {};
    var jwtOptions = authOptions[options.name] || {};

    // NOTE (EK): Pull from global auth config to support legacy auth for an easier transition.
    var jwtSettings = (0, _lodash2.default)({}, defaults, (0, _lodash6.default)(authOptions, KEYS), jwtOptions, (0, _lodash4.default)(options, ['Verifier']));

    if (typeof jwtSettings.header !== 'string') {
      throw new Error('You must provide a \'header\' in your authentication configuration or pass one explicitly');
    }

    if (typeof jwtSettings.secret === 'undefined') {
      throw new Error('You must provide a \'secret\' in your authentication configuration or pass one explicitly');
    }

    var Verifier = _verifier2.default;
    var strategyOptions = (0, _lodash2.default)({
      secretOrKey: jwtSettings.secret,
      jwtFromRequest: _passportJwt.ExtractJwt.fromExtractors([_passportJwt.ExtractJwt.fromAuthHeaderWithScheme('Bearer'), _passportJwt.ExtractJwt.fromHeader(jwtSettings.header.toLowerCase()), _passportJwt.ExtractJwt.fromBodyField(jwtSettings.bodyKey)])
    }, jwtSettings.jwt, (0, _lodash4.default)(jwtSettings, ['jwt', 'header', 'secret']));

    // Normalize algorithm key
    if (!strategyOptions.algorithms && strategyOptions.algorithm) {
      strategyOptions.algorithms = Array.isArray(strategyOptions.algorithm) ? strategyOptions.algorithm : [strategyOptions.algorithm];
      delete strategyOptions.algorithm;
    }

    // Support passing a custom verifier
    if (options.Verifier) {
      Verifier = options.Verifier;
    }

    app.setup = function () {
      var result = _super.apply(this, arguments);
      var verifier = new Verifier(app, jwtSettings);

      if (!verifier.verify) {
        throw new Error('Your verifier must implement a \'verify\' function. It should have the same signature as a jwt passport verify callback.');
      }

      // Register 'jwt' strategy with passport
      // debug('Registering jwt authentication strategy with options:', strategyOptions);
      app.passport.use(jwtSettings.name, new _passportCustom.Strategy(verifier.verify.bind(verifier)));
      app.passport.options(jwtSettings.name, jwtSettings);

      return result;
    };
  };
}

// Exposed Modules
Object.assign(init, {
  defaults: defaults,
  Verifier: _verifier2.default
});
module.exports = exports['default'];