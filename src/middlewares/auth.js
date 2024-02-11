const { errorRes } = require('../common/response');

function isValidPassword(req, res, next) {
  const { password } = req.body;
  if (!password) {
    const err = `invalid is required: ${password}`;
    const errMsg = 'Password is required';
    return errorRes(res, err, errMsg);
  }
  if (password.length < 6) {
    const err = `invalid password: ${password}`;
    const errMsg = 'Password is too short';
    return errorRes(res, err, errMsg);
  }
  return next();
}

function isMatchingPassword(req, res, next) {
  const { password, password_confirm } = req.body;
  if (password != password_confirm) {
    const err = 'password dost not match!';
    const errMsg = 'Passwords does not match!';
    return errorRes(res, err, errMsg);
  }
  return next();
}

module.exports = {
  isValidPassword,
  isMatchingPassword,
};
