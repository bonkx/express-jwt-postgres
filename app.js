// dotenv at the top
require('dotenv').config();
require('express-group-routes');

const createError = require('http-errors');
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const favicon = require('serve-favicon');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

const ErrorHandler = require('./middlewares/ErrorHandler');

const app = express();
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
      'script-src': ["'self'", 'code.jquery.com', 'cdn.jsdelivr.net'],
    },
  }),
);

// Reduce Fingerprinting
app.disable('x-powered-by');

// ROUTES
app.use('/', indexRouter);

app.group('/api/v1', (router) => {
  // PUBLIC ROUTES
  router.use('/auth', authRouter);

  // MIDDLEWARE ROUTES
  router.use('/users', usersRouter);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
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
