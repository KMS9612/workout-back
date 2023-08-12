const express = require("express");
const router = express.Router();
const { CREATE_EXERCISE } = require("../controllers/exerciseControllers");
const { verifyToken } = require("../middlewares/check_token");

router.post("/create_exercise", verifyToken, CREATE_EXERCISE);

module.exports = router;
