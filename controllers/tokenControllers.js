const exchangeToken = (req, res) => {
  const refreshToken = req.body.refreshToken;

  // 리프레쉬 토큰이 없을때 예외처리
  if (!refreshToken) {
    return res.status(401).json({ message: "리프레쉬토큰이 없습니다." });
  }

  // 리프레쉬 토큰 검증
  jwt.verify(refreshToken, REFRESH_SECRET_KEY, (err, decoded) => {
    // Refresh Token이 만료되거나 유효하지 않은 경우
    if (err) {
      return res.sendStatus(403);
    }
    const payload = { email: decoded.email };
    const options = { expiresin: "15m" };
    const newAccessToken = jwt.sign(payload, process.env.CRYPTO_KEY, options);

    return res
      .status(201)
      .json({ message: "엑세스토큰이 재발급 되었습니다.", newAccessToken });
  });
};
module.exports = { exchangeToken };
