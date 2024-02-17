require('dotenv').config();
// this is important!
module.exports = {
    development: {
        url: process.env.DATABASE_URL,
        dialect: 'postgres',
    },
    test: {
        url: process.env.DATABASE_URL,
        dialect: 'postgres',
    },
    production: {
        url: process.env.DATABASE_URL,
        dialect: 'postgres',
    },
};
