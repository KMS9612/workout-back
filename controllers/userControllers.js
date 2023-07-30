const { User } = require("../models/user.js");

// User 생성 require = {name: string , email: string} Optional = {}
const CREATE_USER = async (req, res) => {
  // 클라이언트에서 요청시 body에 담겨오는 정보를 저장하는 변수
  const { email, password } = req.body;
  // models 폴더에서 받아오는 User 스키마
  const user = new User({ email, password });

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

module.exports = {
  CREATE_USER,
  FETCH_USERS,
};
