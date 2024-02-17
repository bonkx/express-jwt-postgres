const jwt = require('jsonwebtoken');

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
        throw new Error('Un-Authorized');
    }

    try {
        const token = authorization.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.payload = payload;
    } catch (err) {
        res.status(401);
        if (err.name === 'TokenExpiredError') {
            throw new Error(err.name);
        }
        throw new Error('Un-Authorized');
    }

    return next();
}

function onlyAdmin(req, res, next) {
    if (req.user.type === 'admin') {
        return next();
    }
    return invalidToken(req, res);
}

function notOnlyMember(req, res, next) {
    if (req.user.type === 'member') {
        return invalidToken(req, res);
    }
    return next();
}

module.exports = {
    notFound,
    errorHandler,
    isAuthenticated,
};
