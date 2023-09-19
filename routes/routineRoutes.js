const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/check_token");

router.post("/create_routine", verifyToken, CREATE_ROUTINE);
/**
 * @swagger
 * /routine/create_routine:
 *   post:
 *     summary: Create a new exercise
 *     tags:
 *       - Create Routine
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               routine:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     routine_name:
 *                       type: string
 *                     routine_exercise:
 *                       type: array
 *                       item:
 *                         type: object
 *                         properties:
 *                            exercise_title: string
 *                            exercise_type: string
 *     responses:
 *       200:
 *         description: Exercise created successfully
 *       400:
 *         description: Bad Request
 */

router.get("/fetch_routine", verifyToken, FETCH_EXERCISE);
/**
 * @swagger
 * /exercise/fetch_exercise:
 *   post:
 *     summary: fetch user exercise
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
 *     responses:
 *       200:
 *         description: Exercise created successfully
 *       400:
 *         description: Bad Request
 */
module.exports = router;
