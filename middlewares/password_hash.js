const bcryptjs = require("bcryptjs");

const hashPassword = async (req, res, next) => {
  const { password } = req.body;

  const salt = await bcryptjs.genSalt(10);
  const password_hashed = await bcryptjs.hash(password, salt);

  req.body.password_hashed = password_hashed;
  next();
};

module.exports = { hashPassword };
