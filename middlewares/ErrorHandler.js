// ErrorHandler.js

const ErrorHandler = (err, req, res, next) => {
    // console.log("Middleware Error Hadnling");
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';
    res.format({
        html: function () {
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            // render the error page
            res.status(errStatus);
            res.render('error');
        },
        json: function () {
            res.json({
                success: false,
                responseCode: errStatus,
                responseMessage: errMsg,
                stack: process.env.NODE_ENV === 'development' ? err.stack : {},
            })
        },
        default: function () {
            res.type('txt').send('Not found')
        }
    })
}

module.exports = ErrorHandler;