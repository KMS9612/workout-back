const express = require("express");
const router = express.Router();
const { CREATE_EXERCISE, FETCH_EXERCISE, DELETE_EXERCISE_BY_NAME, DELETE_EXERCISE_ALL } = require("../controllers/exerciseControllers");
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

router.get("/fetch_exercise", verifyToken, FETCH_EXERCISE);
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

router.delete("/delete_exercise_by_name", verifyToken, DELETE_EXERCISE_BY_NAME);
/**
 * @swagger
 * /exercise/delete_exeracise_by_name:
 *   delete:
 *     summary: Delete Exercise By Exercise Name
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
 *               exercise_name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Exercise Deleted successfully
 *       400:
 *         description: Bad Request
 */

router.delete("/delete_exercise_all", verifyToken, DELETE_EXERCISE_ALL);
module.exports = router;
