const { User } = require("../models/user.js");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

// User 생성
const CREATE_USER = async (req, res) => {
  /* 23.08.05 CREATE_USER는 오로지 회원가입만을 위한 로직을 남기고 유효성확인, 이메일중복검사는 미들웨어로 변경했습니다. */

  // 클라이언트에서 요청시 body에 담겨오는 정보를 저장하는 변수
  const { username, email, password_hashed } = req.body;

  // models 폴더에서 받아오는 User 스키마
  const user = new User({ username, email, password_hashed });
  try {
    await user.save();
    res.status(201).json({ username: user.username, email: user.email });
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
  console.log("로그인 시크릿키", process.env.CRYPTO_KEY);
  // req 정보 변수에 저장
  const email = req.body.email;
  const password = req.body.password;
  const password_hashed = req.body.password_hashed;

  // Token 발급
  const token = generateAccessToken(email);
  const refreshToken = generateRefreshToken(email);
  // 비밀번호 매칭 로직
  // hash(salt)된 비밀번호 복호화
  const isPasswordMatch = await bcryptjs.compare(password, password_hashed);
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "비밀번호가 틀렸습니다." });
  } else {
    // 유저검증이 성공했다면 jwt token 발급
    return res.status(201).send({
      message: "로그인에 성공하였습니다.",
      accessToken: token,
      refreshToken: refreshToken,
    });
  }
};

const generateAccessToken = (email) => {
  const jwtOptions = {
    algorithm: "HS256", // 알고리즘 설정 - HS256
    expiresIn: "1h", // 토큰 만료 시간 설정
  };
  const payload = { email };
  const token = jwt.sign(payload, process.env.CRYPTO_KEY, jwtOptions);
  return token;
};

const generateRefreshToken = (email) => {
  const payload = { email };
  const refreshToken = jwt.sign(payload, process.env.REFRESH_CRYPTO_KEY, {
    expiresIn: "30d",
  });
  return refreshToken;
};

module.exports = {
  CREATE_USER,
  FETCH_USERS,
  LOG_IN,
};
