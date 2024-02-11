const express = require('express');
const bcrypt = require('bcrypt');
const { errorRes, successRes, errData } = require('../common/response');
const { saltRounds, jwtSecretSalt } = require('../utils/salt');

const router = express.Router();

const {
  register,
} = require('../controllers/auth');

router.use([isValidPassword, isMatchingPassword]);

router.post('/register', isEmailOrUsernameExists, hashPassword, register);

router.post('/login', (req, res, next) => {
  successRes(res);
});

function isValidPassword(req, res, next) {
  const { password } = req.body;
  if (!password || password.length < 6) {
    const err = `invalid password: ${password}`;
    const errMsg = 'password is too short';
    return errorRes(res, err, errMsg);
  }
  return next();
}

function isMatchingPassword(req, res, next) {
  const { password, password_confirm } = req.body;
  if (password != password_confirm) {
    const err = 'password dost not match!';
    const errMsg = 'passwords does not match!';
    return errorRes(res, err, errMsg);
  }
  return next();
}

function hashPassword(req, res, next) {
  const { password } = req.body;
  bcrypt.hash(password, saltRounds, (err, hashed) => {
    if (err) return errorRes(res, err, 'unable to sign up, try again');
    req.body.password = hashed;
    return next();
  });
}

function findByEmail(req, res, next) {
  // const { email, password } = req.body
  // User.findOne({ email }, '+password', { lean: true }, (err, data) => {
  //   console.log(err)
  //   console.log(data)
  //   if (err || !data)
  //     return errorRes(res, 'invalid login', 'invalid password or email')
  //   req.body = { unhashedPassword: password, ...data }
  //   return next()
  // })
}

function isEmailOrUsernameExists(req, res, next) {
  // console.log(User)
  // const { email, password } = req.body
  // User.findOne({ where: { email } }).then((user) => {
  //   if (user) return done(null, false, { message: `There is no record of the email ${email}.` });
  //   return next()
  // }).catch((err) => {
  //   console.log(err);
  //   return errorRes(res)
  // })
  return next();
}

module.exports = router;
