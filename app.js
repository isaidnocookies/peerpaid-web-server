var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const feathers = require('feathers')
const rest = require('feathers-rest')
const socketio = require('feathers-socketio')
const hooks = require('feathers-hooks');
const configuration = require('feathers-configuration');


const routes = require('./routes/index');
const apiRoutes = require('./routes/api');

const secureRoute = require('./routes/secure');

const jwtverify = require('./routes/jwtverify');// Middleware for jwt

const socket = require('./routes/socket');
const validate = require('./lib/validate')

const featherConfig = require('./feathers')

//var app = express();
var app = feathers();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

validate.express(app)

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=> {
  console.log("Url:", req.url)
  console.log("Headers:",req.headers)

  next();
})

app.use(jwtverify); // Execute JWT middleware before any routes.


app.use('/socket', socket);

app.use('/', routes);

app.use('/api', apiRoutes);

//app.use('/secure', jwtverify.checkAuth, secureRoute);

featherConfig(app)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


module.exports = app;
