function errorRes(res, err, statusCode = 500, errMsg = 'Request failed to process') {
    console.error('ERROR:', err);
    return res.status(statusCode).json({
        success: false,
        responseCode: statusCode,
        responseMessage: errMsg,
        errors: err,
    });
}

function successRes(res, data, statusCode = 200, sucMsg = 'Request has been processed successfully') {
    return res.status(statusCode).json({
        success: true,
        responseCode: statusCode,
        responseMessage: sucMsg,
        data,
    });
}

function errData(res, errMsg = 'failed operation') {
    return (err, data) => {
        if (err) return errorRes(res, err, 500, errMsg);
        return successRes(res, data);
    };
}

module.exports = { errorRes, successRes, errData };
