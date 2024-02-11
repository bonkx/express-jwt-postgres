const db = require('../entity/models');
const { errorRes, successRes, errData } = require('../common/response');

const User = db.users;

function login(req, res) {
  jwt.sign(
    req.body,
    jwtSecretSalt,
    { algorithm: 'HS512', expiresIn: '31d' },
    errData(res, 'token error'),
  );
}

exports.create = (req, res) => {
  const payload = {
    username: req.body.username,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone_number: req.body.phone,
  };

  User.create(payload)
    .then((data) => {
      successRes(res, data, null, 201);
    })
    .catch((err) => {
      errorRes(res, err, err.message);
    });
};
