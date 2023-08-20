const express = require("express");
const router = express.Router();
const { CREATE_EXERCISE } = require("../controllers/exerciseControllers");
const { verifyToken } = require("../middlewares/check_token");

router.post("/create_exercise", verifyToken, CREATE_EXERCISE);
/**
 * @swagger
 * /exercise/create_exercise:
 *   post:
 *     summary: Create a new exercise
 *     tags:
 *       - Exercise
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               exercise:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     exercise_name:
 *                       type: string
 *                     exercise_type:
 *                       type: string
 *     responses:
 *       200:
 *         description: Exercise created successfully
 *       400:
 *         description: Bad Request
 */
module.exports = router;
