const { errData, errorRes, successRes } = require('./response');
const db = require('./src/config/db');

function create(model, populate = []) {
  return (req, res) => {
    const newData = new model({
      ...req.body,
    });
    return newData.save()
      .then((t) => t.populate(...populate, errData(res)))
      .catch((err) => errorRes(res, err));
  };
}

function read(model, populate = []) {
  return (req, res) => (
    model.find(...req.body, errData(res)).populate(...populate)
  );
}

function update(model, populate = []) {
  return (req, res) => {
    req.body.updated_at = new Date();
    return model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      errData(res),
    ).populate(...populate);
  };
}

function remove(model) {
  return (req, res) => (
    model.deleteOne({ id: req.params.id }, errData(res))
  );
}

module.exports = {
  read, create, update, remove,
};
