const express = require("express");
const router = express.Router();
const { exchangeToken } = require("../controllers/tokenControllers");

// 리프레쉬 토큰으로 엑세스토큰 재발급
router.post("/exchangeToken", exchangeToken);

module.exports = router;
