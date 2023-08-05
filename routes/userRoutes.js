const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userControllers");
const { validateSignupRules, validateSignup } = require("../middlewares/userValidate");
const { hashPassword } = require("../middlewares/password_hash");
const { findForLogin, findForSignUp } = require("../middlewares/find_email");

// Middleware 순서 [유효성검증 => 이메일 중복검증 => 비밀번호 해쉬 => 회원가입 진행]
router.post(`/CREATE_USER`, validateSignupRules, validateSignup, findForSignUp, hashPassword, UserController.CREATE_USER);

router.get(`/fetchUsers`, UserController.FETCH_USERS);

// Middleware 순서 [이메일 존재유/무 검증 => 로그인 진행(JWT발급)]
router.post(`/login`, findForLogin, UserController.LOG_IN);
module.exports = router;
