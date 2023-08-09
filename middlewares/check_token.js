const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  const token = authorizationHeader && authorizationHeader.split(" ")[1];
  console.log("체크", process.env.CRYPTO_KEY);
  if (!token) {
    console.log("token이 없습니다.");
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.CRYPTO_KEY, (err, decoded) => {
    if (err) {
      console.log("형식이 잘못되었거나, 만료되었습니다.");
      return res.sendStatus(401); // 토큰 만료에 대해 401(Unauthorized) 응답을 반환합니다.
    }
    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken };
