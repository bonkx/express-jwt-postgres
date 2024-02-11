module.exports = {
  saltRounds: Math.floor(Math.random() * 10),
  jwtSecretSalt: [...Array(9)].map(() => Math.random().toString(36)[2]).join(''),
};
