function errorRes(res, err, errMsg = 'Request failed to process', statusCode = 500) {
    console.error('ERROR:', err);
    return res.status(statusCode).json({
        success: false,
        responseCode: statusCode,
        responseMessage: errMsg,
        errors: err,
    });
}

function successRes(res, data, sucMsg = 'Request has been processed successfully', statusCode = 200) {
    return res.status(statusCode).json({
        success: true,
        responseCode: statusCode,
        responseMessage: sucMsg,
        data,
    });
}

function errData(res, errMsg = 'failed operation') {
    return (err, data) => {
        if (err) return errorRes(res, err, errMsg);
        return successRes(res, data);
    };
}

module.exports = { errorRes, successRes, errData };
