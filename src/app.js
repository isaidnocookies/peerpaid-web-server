const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');

const handler = require('feathers-errors/handler');
const notFound = require('feathers-errors/not-found');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');

const authentication = require('./authentication');

const mongoose = require('./mongoose');

const app = feathers();


// Load app configuration
app.configure(configuration());
// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Set up Plugins and providers
app.configure(hooks());
app.configure(mongoose);
app.configure(rest());
app.configure(socketio(function (io){
  io.on('connection', function (socket){
    socket.on('set-currencyAccounts', function (currencyAccounts, callback){
      socket.feathers.currencyAccounts = currencyAccounts;
    });
  });
}));

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);

// Set up our services (see `services/index.js`)
app.configure(services);




app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', feathers.static(app.get('public')));

// Configure a middleware for 404s and the error handler
app.use(notFound());
app.use(handler());

app.hooks(appHooks);

module.exports = app;
