const { body, validationResult } = require("express-validator");

const validateSignupRules = [
  body("username").notEmpty().withMessage("사용자 이름이 필요합니다."),

  body("email").isEmail().withMessage("올바른 이메일 주소를 입력해주세요."),

  body("password")
    .isLength({ min: 8 })
    .withMessage("비밀번호는 최소 8자 이상이어야 합니다."),
];

const validateSignup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "유효성 검사에 실패했습니다.", errors: errors.array() });
  } else {
    return next();
  }
};

module.exports = { validateSignupRules, validateSignup };
