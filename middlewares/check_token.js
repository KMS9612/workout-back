const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  const token = authorizationHeader && authorizationHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.CRYPTO_KEY, { clockTolerance: 30, debug: true }, (err, decoded) => {
    if (err) {
      return res.sendStatus(401); // 토큰 만료에 대해 401(Unauthorized) 응답을 반환합니다.
    }
    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken };
