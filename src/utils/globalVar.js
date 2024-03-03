const myGlobalVariable = {
    DEBUG: process.env.NODE_ENV === 'development',
    BASE_URL: process.env.BASE_URL,
    APP_NAME: process.env.APP_NAME,
    TEST: 'TEST',
    NEW_VERIFY_LINK: 'new_verify_link',

};

module.exports = { myGlobalVariable };
