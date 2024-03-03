/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
// dotenv at the top
require('dotenv').config();
require('module-alias/register');
require('express-group-routes');
const rfs = require('rotating-file-stream');
const compression = require('compression');
const fileUpload = require('express-fileupload');
const helmet = require('helmet');
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const myGlobalVariable = require('@src/utils/globalVar');

const routes = require('@src/routes/index.route');
const webRoutes = require('@src/routes/web.route');

const middlewares = require('@src/middlewares/index');

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

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'hbs');
hbs.registerPartials(`${__dirname}/src/views/partials`, (err) => { });
hbs.registerHelper('global', (key) => myGlobalVariable[key]);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));

// Add helmet to the middleware chain.
// Set CSP headers to allow our Bootstrap and Jquery to be served
app.use(
    helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
            'img-src': ["'self'", 'https: data:'],
            'script-src': ["'self'", 'code.jquery.com', 'cdn.jsdelivr.net'],
        },
    }),
);

const corsOptions = {
    origin: 'http://localhost:8000',
};
app.use(cors(corsOptions));

app.use(fileUpload({
    limits: { fileSize: 20 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: '/tmp/',
}));

// Reduce Fingerprinting
app.disable('x-powered-by');
app.use(compression()); // Compress all routes

// WEB ROUTES
app.use('', webRoutes);
// API ROUTES
app.use('/api/v1/', routes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// disable console.log system wide in production
if (process.env.NODE_ENV === 'production') {
    console.log = () => { };
    console.error = () => { };
    console.debug = () => { };
}

// let redisClient = null;
// (async () => {
//     redisClient = redis.createClient();

//     redisClient.on('error', (error) => console.error(`Redis Error : ${error}`));
//     redisClient.on('connect', () => console.log('Redis connected!'));
//     await redisClient.connect();
// })();

module.exports = app;
