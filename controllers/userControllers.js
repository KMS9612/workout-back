const { User } = require("../models/user.js");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");
// User 생성
const CREATE_USER = async (req, res) => {
  // 클라이언트에서 요청시 body에 담겨오는 정보를 저장하는 변수
  const { username, email, password } = req.body;

  // user.save전에 password 해싱(암호화 라이브러리 사용)
  const salt = await bcryptjs.genSalt(10);
  const password_hashed = await bcryptjs.hash(password, salt);

  // models 폴더에서 받아오는 User 스키마
  const user = new User({ username, email, password_hashed });

  try {
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "사용자 생성에 실패했습니다.", error });
  }
};

// 모든 User 불러오기
const FETCH_USERS = async (req, res) => {
  const users = await User.find();
  try {
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

// User 로그인
const LOG_IN = async (req, res) => {
  // 해당 유저가 있는지 체크하는 로직
  const user = await User.findOne({
    email: req.body.email,
  });
  // email이 존재하지 않는다면
  if (!user) {
    return res.status(400).json({ message: "이메일이 존재하지않습니다." });
  }
  // 비밀번호 매칭 로직
  // hash(salt)된 비밀번호 복호화
  const password = req.body.password;
  const isPasswordMatch = await bcryptjs.compare(
    password,
    user.password_hashed
  );
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "비밀번호가 틀렸습니다." });
  } else {
    // 유저검증이 성공했다면 jwt token 발급
    const payload = req.email;
    const token = jwt.sign(payload, process.env.CRYPTO_KEY);
    return res.status(201).send({
      message: "로그인에 성공하였습니다.",
      accessToken: token,
      refreshToken: "제작중..",
    });
  }
};

module.exports = {
  CREATE_USER,
  FETCH_USERS,
  LOG_IN,
};
