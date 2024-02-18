const { check } = require('express-validator');

const loginValidator = [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('password', 'The minimum password length is 4 characters').isLength({ min: 4 }),
];

const registerValidator = [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    // check('age', 'username must be Alphanumeric').isAlphanumeric(),
    // check('birthday', 'Invalid birthday').isISO8601(), // check date is ISOString
    check('password', 'You must enter a password').not().isEmpty(),
    check('password', 'The minimum password length is 4 characters').isLength({ min: 4 }),
    check('password_confirm', 'Passwords does not match').custom((value, { req }) => (value === req.body.password)),
];

module.exports = {
    loginValidator,
    registerValidator,
};