var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var apiRoutes = require('./routes/api');

var secureRoute = require('./routes/secure');

var jwtverify = require('./routes/jwtverify');// Middleware for jwt

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Display Expiring notice for 30 second mark on JWT expiration
app.use(function (req, res, next){
  res.callJson = res.json;
  res.json = function (obj){
    if (req.jwt && req.jwt.exp){
      var expTime = Math.floor(Date.now() / 1000);
      var expLeft = req.jwt.exp - expTime
      if (expLeft < 30){
        obj.tokenExpiring = true;
      }
    }

    res.callJson(obj);
  }
  next(); 
});

app.use(jwtverify); // Execute JWT middleware before any routes.




app.use('/', routes);

app.use('/api', apiRoutes);

//app.use('/secure', jwtverify.checkAuth, secureRoute);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
