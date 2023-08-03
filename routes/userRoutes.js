const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userControllers");
const { validateSignup } = require("../middlewares/userValidate");

router.post(`/CREATE_USER`, validateSignup, UserController.CREATE_USER);

router.get(`/fetchUsers`, UserController.FETCH_USERS);

router.post(`/loginUser`, UserController.LOG_IN);
module.exports = router;
