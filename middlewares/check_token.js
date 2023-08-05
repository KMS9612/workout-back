const jwt = require("jsonwebtoken");

// 토큰 만료시간 검증
function isTokenExpired(token) {
  const secretKey = process.env.CRYPTO_KEY; // JWT 검증에 사용할 키

  /* (?. 국가별 시간대를 고려해야하므로 moment라이브러리나 한국에 한하여 검증을 고려하기!) */
  try {
    const decoded = jwt.verify(token, secretKey, { ignoreExpiration: false }); // ignoreExpiration 옵션을 false로 설정하여 만료 시간을 검증
    const now = Math.floor(Date.now() / 1000); // 현재 시간을 초 단위로 변환
    return now > decoded.exp; // 만료 시간과 현재 시간을 비교하여 만료 여부 반환
  } catch (err) {
    return true; // 검증 실패로 인해 만료된 토큰으로 처리
  }
}

const checkToken = (req, res, next) => {
  // 토큰
  const token = req.body.accessToken; // 요청에 담겨오는 액세스토큰
  const secretKey = process.env.CRYPTO_KEY; // JWT 검증에 사용할 키

  const options = {
    algorithms: ["HS256"], // 알고리즘 설정 - HS256
    ignoreExpiration: false,
  };

  // JWT 토큰 검증
  jwt.verify(token, secretKey, options, function (err, decoded) {
    if (err) {
      return res.status(400).json({ message: "토큰 검증에 실패했습니다.", result: false });
    } else {
      next();
    }
  });
};
