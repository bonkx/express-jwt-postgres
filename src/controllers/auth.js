const bcrypt = require('bcrypt');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const { errorRes, successRes, errData } = require('../common/response');
const { saltRounds, jwtSecretSalt } = require('../utils/salt');

function login(req, res) {
  jwt.sign(
    req.body,
    jwtSecretSalt,
    { algorithm: 'HS512', expiresIn: '31d' },
    errData(res, 'token error'),
  );
}

async function isEmailOrUsernameExists(req, res, next) {
  // const { email, username } = req.body
  // const obj = await User.findOne({ where: { email } });
  // if (obj === null) {
  //     console.log('Not found!');
  // } else {
  //     console.log(obj instanceof User); // true
  //     console.log(obj.email); // 'My Title'
  // }
  // return obj
}

exports.register = async (req, res) => {
  console.log(req.body);
  exist = isEmailOrUsernameExists(req);

  const payload = {
    username: req.body.username,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
    phone_number: req.body.phone,
  };
  console.log(payload);
  const err = 'invalid password';
  const errMsg = 'zzzzz';
  return errorRes(res, err, errMsg);
  // User.create(payload)
  //     .then((data) => {
  //         successRes(res, data, null, 201)
  //     })
  //     .catch((err) => {
  //         errorRes(res, err, err.message)
  //     });
};
