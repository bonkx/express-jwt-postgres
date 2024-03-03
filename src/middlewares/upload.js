/* eslint-disable import/no-extraneous-dependencies */
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const mkdirp = require('mkdirp');
const path = require('path');

// const UPLOAD_PATH = path.join(__dirname, '/uploads');
const UPLOAD_PATH = path.join(path.resolve('./'), '/uploads');
// console.log(UPLOAD_PATH);

mkdirp.sync(UPLOAD_PATH);

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_PATH);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
        // cb(null, `${uuidv4()}_${file.originalname}`);
    },
});

const limits = {
    fileSize: 5 * 1024 * 1024,
};

const fileFilter = (req, file, done) => {
    console.log('file.mimetype: ', file.mimetype);
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        done(null, true);
    } else {
        done(new Error('file type not supported'), false);
    }
};

// Create the multer instance
const upload = multer({ storage, limits, fileFilter });

module.exports = upload;
