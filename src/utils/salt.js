const bcrypt = require('bcryptjs');

function generatePasswordHash(str) {
    const saltRounds = Math.floor(Math.random() * 10);
    return bcrypt.hashSync(str, saltRounds);
}

module.exports = {
    generatePasswordHash,
    saltRounds: Math.floor(Math.random() * 10),
    jwtSecretSalt: [...Array(9)].map(() => Math.random().toString(36)[2]).join(''),
};
