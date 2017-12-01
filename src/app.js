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
if ((process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'devServer') && config.has('mongoCert')) {
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

app.configure(function () {
  var app = this;

  return;
  const liveDataService = app.service('live-data');

  const ba = require('bitcoinaverage');

  if (!config.get('bitcoinAverageAPI')){
    throw new Error("Bitcoin Average API secret and private keys not defined");
  } 

  const publicKey = config.get('bitcoinAverageAPI').publicKey;
  const secretKey = config.get('bitcoinAverageAPI').secretKey;

  var restClient = ba.restfulClient(publicKey, secretKey);
  var wsClient = ba.websocketClient(publicKey, secretKey);


  try {
    // Here we log the response received by https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD. For custom usage you just need to implement the Anonimous function and do something else instead of console.log(response);.
    restClient.tickerGlobalPerSymbol('BTCUSD', function (response) {
      console.log("BTCUSD:", response);
    });

    var lastLiveData = void 0;

    app.on('connection', connection => {
      liveDataService.update("abababababababababababab", lastLiveData);
    })

    // Here we show an example how to connect to one of our websockets and get periodical update for the Global Price Index for 'BTCUSD'. You can use 'local' instead of 'global', or you can change the crypto-fiat pair to something else (example: ETHEUR), depending on your needs.
    wsClient.connectToTickerWebsocket('global', 'BTCUSD', function (response) {
      lastLiveData = { "id": "abababababababababababab", name: "BTCUSD", data: response };
      liveDataService.update("abababababababababababab", lastLiveData);
    });


  }
  catch (e) {
    console.log("Error With Api:", e)
  }

})

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

app.hooks(appHooks);

module.exports = app;
