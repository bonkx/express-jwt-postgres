// dotenv at the top
require('dotenv').config()
require('express-group-routes');

var createError = require('http-errors');
var compression = require('compression');
var helmet = require("helmet");
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

var ErrorHandler = require('./middlewares/ErrorHandler');

var app = express();
app.locals.env = process.env;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));

app.use(compression()); // Compress all routes

// Add helmet to the middleware chain.
// Set CSP headers to allow our Bootstrap and Jquery to be served
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  }),
);

// Reduce Fingerprinting
app.disable('x-powered-by')

// ROUTES
app.use('/', indexRouter);

app.group("/api/v1", (router) => {
  // PUBLIC ROUTES
  router.use('/auth', authRouter);

  // MIDDLEWARE ROUTES
  router.use('/users', usersRouter);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
/**
 * Any error handler middleware must be added AFTER you define your routes.
 */
app.use(ErrorHandler);
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
