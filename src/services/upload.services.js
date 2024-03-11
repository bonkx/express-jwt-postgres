/* eslint-disable import/no-unresolved */
const { processUploadFile } = require('@src/utils/upload');

async function uploadFile(req, res) {
    try {
        let filePath = null;
        // upload file
        console.log('upload file');
        if (req.files) {
            // console.log(req.files);
            filePath = await processUploadFile(req, res);
            console.log(filePath);
        }

        return filePath;
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = { uploadFile };
