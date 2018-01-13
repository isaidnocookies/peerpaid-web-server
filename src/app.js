const path = require('path');
const fs = require('fs');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const configuration = require('@feathersjs/configuration');
const rest = require('@feathersjs/express/rest');
const socketio = require('@feathersjs/socketio');

const feathersSync = require('feathers-sync');

const handler = require('@feathersjs/express/errors');
const notFound = require('feathers-errors/not-found');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const defaults = require('./defaults');

const authentication = require('./authentication');

const mongoose = require('./mongoose');

const app = express(feathers());

const config = require('config');

// Load app configuration
app.configure(configuration());
// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.configure(mongoose);
app.configure(rest());
app.configure(socketio(function (io) {
  io.on('connection', function (socket) {
    if (config.has('clientConfig')) {
      setTimeout(() => {
        socket.emit('clientConfig', config.get('clientConfig'));
      }, 10);
    }
    socket.on('set-currencyAccounts', function (currencyAccounts, callback) {
      socket.feathers.currencyAccounts = currencyAccounts;
    });
  });
}));


var feathersSyncConfig = Object.assign({}, config.get('feathersSync'));
if ((['production', 'devServer', 'productionPrep'].indexOf(process.env.NODE_ENV) >= 0) && config.has('mongoCert')) {
  var cert = fs.readFileSync(config.get('mongoCert'), 'utf8');
  var mongoOptions = {};
  mongoOptions.ssl = true;
  mongoOptions.sslValidate = false;
  mongoOptions.sslKey = cert;
  mongoOptions.sslCert = cert;
  mongoOptions.sslCA = cert;
  feathersSyncConfig.mubsub = Object.assign({}, feathersSyncConfig.mubsub, mongoOptions);
}
app.configure(feathersSync(feathersSyncConfig));

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);

// Set up our services (see `services/index.js`)
app.configure(services);


app.configure(defaults);


app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

// Setup event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(notFound());
app.use(handler());

app.set('trust proxy', 'loopback');
app.hooks(appHooks);

module.exports = app;
