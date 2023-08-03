const { check } = require("express-validator");

const validateSignup = async (req, res, next) => {
  const { email, password, name } = req.body;

  // DB에 같은 email이 있는지 확인하는 코드 필요
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(409).json({ error: "이미 사용중인 이메일입니다." });
  }
  // 유효성 검사
  const emailCheck = check(email, "Invalid email").isEmail();
  const passwordCheck = check(
    password,
    "Password must be at least 6 characters"
  ).isLength({
    min: 6,
    max: 13,
  });
  const nameCheck = check(name).notEmpty();

  // 검증이 실패했을때
  if (!emailCheck || !passwordCheck || !nameCheck) {
    // 유효성 검증에 실패했을때 코드
    return res.status(400).join({ message: "유효성 검사에 실패했습니다." });
  } else {
    // 다음 로직으로 향하는 코드
    return next();
  }
};

module.export = { validateSignup };
