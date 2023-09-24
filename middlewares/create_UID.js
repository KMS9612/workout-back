const { ObjectId } = require("mongodb");

const createUid = (req, res, next) => {
  const UID = new ObjectId();

  req.body.uid = UID;

  next();
};

module.exports = { createUid };
