const jwt = require('jsonwebtoken');
const { onlyAdmin, onlyMember } = require('./auth');

function notFound(req, res, next) {
    res.status(404);
    const error = new Error('Oops.. You are lost!');
    next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
    /* eslint-enable no-unused-vars */
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    const errMsg = err.message;

    console.log(err.stack);

    res.status(statusCode).json({
        success: false,
        responseCode: statusCode,
        responseMessage: errMsg,
        // errors: err,
    });
}

function isAuthenticated(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(401);
        throw new Error('Authentication failed');
    }

    try {
        const token = authorization.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = payload;
        // console.log('user: ', payload);
    } catch (err) {
        res.status(401);
        if (err.name === 'TokenExpiredError') {
            throw new Error('Token Expired!');
        }
        throw new Error('Un-Authorized');
    }

    return next();
}

module.exports = {
    notFound,
    errorHandler,
    isAuthenticated,
    onlyAdmin,
    onlyMember,
};
