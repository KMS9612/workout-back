const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userControllers");
const { validateSignupRules, validateSignup } = require("../middlewares/userValidate");
const { hashPassword } = require("../middlewares/password_hash");
const { findForLogin, findForSignUp, findUsername } = require("../middlewares/find_email");
const { verifyToken } = require("../middlewares/check_token");
const { createUid } = require("../middlewares/create_UID");

router.post(`/CREATE_USER`, validateSignupRules, validateSignup, findForSignUp, findUsername, hashPassword, createUid, UserController.CREATE_USER);
/**
 * @swagger
 * /CREATE_USER:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Bad Request
 */
router.get(`/fetchUsers`, verifyToken, UserController.FETCH_USERS);
/**
 * @swagger
 * /fetchUsers:
 *   get:
 *     summary: Fetch all users
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   email:
 *                     type: string
 */
// Middleware 순서 [이메일 존재유/무 검증 => 로그인 진행(JWT발급)]
router.post(`/login`, findForLogin, UserController.LOG_IN);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Log in successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */
module.exports = router;
