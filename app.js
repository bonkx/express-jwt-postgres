// dotenv at the top
require('dotenv').config();
require('express-group-routes');

const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const favicon = require('serve-favicon');

const routes = require('./src/api/index');

const middlewares = require('./src/middlewares/index');

const app = express();
app.locals.env = process.env;

const corsOptions = {
  origin: 'http://localhost:8000',
};
app.use(cors(corsOptions));

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));

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
// app.use('/', indexRouter);
app.use('/', routes);

// app.use(notFound);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.use(compression()); // Compress all routes

// disable console.log system wide
if (process.env.NODE_ENV === 'production') {
  console.log = () => { };
  console.error = () => { };
  console.debug = () => { };
}

module.exports = app;
