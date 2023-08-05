const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userControllers");

const {
  validateSignupRules,
  validateSignup,
} = require("../middlewares/userValidate");

router.post(
  `/CREATE_USER`,
  validateSignupRules,
  validateSignup,
  UserController.CREATE_USER
);

router.get(`/fetchUsers`, UserController.FETCH_USERS);

router.post(`/login`, UserController.LOG_IN);
module.exports = router;
