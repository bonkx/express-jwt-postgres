const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
// const key = crypto.randomBytes(32);
// const iv = crypto.randomBytes(16);
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;
// Generate secret hash with crypto to use for encryption
const key = crypto.createHash('sha512').update(JWT_ACCESS_SECRET).digest('hex').substring(0, 32);
const iv = crypto.createHash('sha512').update(JWT_REFRESH_SECRET).digest('hex').substring(0, 16);

function hashToken(token) {
    return crypto.createHash('sha512').update(token).digest('hex');
}

// Encrypt data
function encryptData(data) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    return Buffer.from(
        cipher.update(data, 'utf8', 'hex') + cipher.final('hex'),
    ).toString('base64'); // Encrypts data and converts to hex and base64
}

// Decrypt data
function decryptData(encryptedData) {
    const buff = Buffer.from(encryptedData, 'base64');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    return (
        decipher.update(buff.toString('utf8'), 'hex', 'utf8')
    + decipher.final('utf8')
    ); // Decrypts data and converts to utf8
}

module.exports = { hashToken, encryptData, decryptData };
