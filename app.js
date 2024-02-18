/* eslint-disable no-unused-vars */
// dotenv at the top
require('dotenv').config();
require('module-alias/register');
require('express-group-routes');
const rfs = require('rotating-file-stream');
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const favicon = require('serve-favicon');

const routes = require('./src/routes/index.route');

const middlewares = require('./src/middlewares/index');

const app = express();
app.locals.env = process.env;

// create a rotating write stream
const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log'),
});

// setup the logger
// log only 4xx and 5xx responses to console
app.use(logger('dev', {
    skip(req, res) { return res.statusCode < 400; },
}));
// log all requests to access.log
app.use(logger(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms',
    { stream: accessLogStream },
));

const corsOptions = {
    origin: 'http://localhost:8000',
};
app.use(cors(corsOptions));

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'hbs');
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
app.use(compression()); // Compress all routes

/* GET home page. */
app.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});
app.get('/ping', (req, res) => res.json('pong'));

// API ROUTES
app.use('/api/v1/', routes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// disable console.log system wide
if (process.env.NODE_ENV === 'production') {
    console.log = () => { };
    console.error = () => { };
    console.debug = () => { };
}

module.exports = app;
