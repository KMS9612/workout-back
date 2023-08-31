const { User } = require("../models/user");

// 존재하는 이메일인지 확인
const findForSignUp = async (req, res, next) => {
  const findEmail = await User.findOne({
    email: req.body.email,
  });
  if (findEmail) {
    return res.status(409).json({ message: "이미 존재하는 이메일입니다." });
  }
  if (!findEmail) {
    next();
  }
};

const findForLogin = async (req, res, next) => {
  const findEmail = await User.findOne({
    email: req.body.email,
  });
  console.log(findEmail);
  if (!findEmail) {
    return res.status(409).json({ message: "이메일이 존재하지 않습니다." });
  }
  if (findEmail) {
    req.body.password_hashed = findEmail.password_hashed;
    req.body.username = findEmail.username;
    next();
  }
};

module.exports = { findForLogin, findForSignUp };
