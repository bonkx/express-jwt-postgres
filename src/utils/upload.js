const sharp = require('sharp');
const path = require('path');
const imageSize = require('image-size');
const fs = require('fs');

const UPLOAD_PATH = path.join(path.resolve('./'), '/uploads');
const FILELIMIT = (5 * 1024 * 1024); // 5Mb
const RESIZED_IMAGE_WIDTH = 1920;

function mkdirRecursiveSync(xpath) {
    const paths = xpath.split(path.delimiter);
    let dirPath = '';
    paths.forEach((newPath) => {
        if (dirPath === '') {
            dirPath = newPath;
        } else {
            dirPath = `${dirPath}/${newPath}`;
        }

        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }
    });
}

async function processUploadPhotoProfile(req, res, folder = 'users') {
    const CROP_HEIGHT = 360;
    const CROP_WIDTH = 360;

    const { data: buffer, name, size } = req.files.file;
    const originalname = path.parse(name).name;
    // console.log(buffer);
    // console.log(originalname);
    // const dimension = imageSize(buffer);
    // console.log(dimension.width);
    // console.log(dimension.height);
    console.log('file size: ', size);
    console.log('file limit: ', FILELIMIT);
    if (size > FILELIMIT) {
        res.status(413);
        throw new Error('File too large');
    }

    const extensionName = path.extname(name); // fetch the file extension
    const allowedExtension = ['.png', '.jpg', '.webp'];
    if (!allowedExtension.includes(extensionName)) {
        throw new Error('Invalid Image');
    }

    // create media folder
    const mediaPath = 'media';
    mkdirRecursiveSync(`${UPLOAD_PATH}/${mediaPath}`);

    const dirPath = `${mediaPath}/${folder}`;
    console.log(dirPath);
    const fileName = `${new Date().getTime()}-${originalname}.webp`;
    // create image folder
    mkdirRecursiveSync(`${UPLOAD_PATH}/${dirPath}`);

    const filePath = `${dirPath}/${fileName}`;
    const fullPathImage = `${UPLOAD_PATH}/${filePath}`;
    console.log(fileName);
    await sharp(buffer).resize({ width: CROP_WIDTH, height: CROP_HEIGHT, fit: 'cover' })
        .webp({ quality: 90 })
        .toFile(fullPathImage);

    return filePath;
}

async function processUploadImage(req, res, folder = 'images') {
    const { data: buffer, name, size } = req.files.file;
    const originalname = path.parse(name).name;
    // console.log(buffer);
    // console.log(originalname);
    const dimension = imageSize(buffer);
    // console.log(dimension.width);
    // console.log(dimension.height);
    console.log('file size: ', size);
    console.log('file limit: ', FILELIMIT);
    if (size > FILELIMIT) {
        res.status(413);
        throw new Error('File too large');
    }
    const imageWidth = dimension.width;
    // let resizedWidth = Math.ceil(imageWidth * 0.9);
    let resizedWidth = imageWidth;
    if (imageWidth > RESIZED_IMAGE_WIDTH) {
        resizedWidth = RESIZED_IMAGE_WIDTH;
    }
    console.log('resizedWidth: ', resizedWidth);

    const extensionName = path.extname(name); // fetch the file extension
    const allowedExtension = ['.png', '.jpg', '.webp'];
    if (!allowedExtension.includes(extensionName)) {
        throw new Error('Invalid Image');
    }

    // create media folder
    const mediaPath = 'media';
    mkdirRecursiveSync(`${UPLOAD_PATH}/${mediaPath}`);

    const dirPath = `${mediaPath}/${folder}`;
    console.log(dirPath);
    const fileName = `${new Date().getTime()}-${originalname}.webp`;
    // create image folder
    mkdirRecursiveSync(`${UPLOAD_PATH}/${dirPath}`);

    const filePath = `${dirPath}/${fileName}`;
    const fullPathImage = `${UPLOAD_PATH}/${filePath}`;
    console.log(fileName);
    await sharp(buffer).resize(resizedWidth)
        .webp({ quality: 90 })
        .toFile(fullPathImage);

    return filePath;
}

async function processUploadFile(req, res, folder = 'files') {
    const { name, size } = req.files.file;
    const targetFile = req.files.file;
    // const originalname = path.parse(name).name;
    // console.log(buffer);
    // console.log(originalname);
    // const dimension = imageSize(buffer);
    // console.log(dimension.width);
    // console.log(dimension.height);
    console.log('file size: ', size);
    console.log('file limit: ', FILELIMIT);
    if (size > FILELIMIT) {
        res.status(413);
        throw new Error('File too large');
    }

    const extensionName = path.extname(name); // fetch the file extension
    const allowedExtension = ['.pdf', '.docx', '.doc', '.xls', 'xlsx', '.txt'];
    if (!allowedExtension.includes(extensionName)) {
        throw new Error('Invalid File');
    }

    // create media folder
    const mediaPath = 'media';
    mkdirRecursiveSync(`${UPLOAD_PATH}/${mediaPath}`);

    const dirPath = `${mediaPath}/${folder}`;
    console.log(dirPath);
    const fileName = `${new Date().getTime()}-${name}`;
    // create image folder
    mkdirRecursiveSync(`${UPLOAD_PATH}/${dirPath}`);

    const filePath = `${dirPath}/${fileName}`;
    const fullPathImage = `${UPLOAD_PATH}/${filePath}`;
    console.log(fileName);

    targetFile.mv(fullPathImage, (err) => {
        if (err) {
            throw new Error(err.message);
        }
    });

    return filePath;
}

module.exports = { processUploadPhotoProfile, processUploadImage, processUploadFile };
