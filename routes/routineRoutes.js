const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/check_token");
const { CREATE_ROUTINE, FETCH_ROUTINES, FETCH_ROUTINE_INFO, DELETE_ROUTINE_ALL, DELETE_ROUTINE_BY_NAME, UPDATE_ROUTINE } = require("../controllers/routineControllers");

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
 *               uid:
 *                 type: string
 *               username:
 *                 type: string
 *               routine:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     routine_title:
 *                       type: string
 *                     routine_exercise:
 *                       type: array
 *                       item:
 *                         type: object
 *                         properties:
 *                            exercise_title: String
 *                            exercise_type: String
 *                            exercise_reps: Number
 *                            exercise_sets: Number
 *     responses:
 *       200:
 *         description: Routine created successfully
 *       400:
 *         description: Bad Request
 */

router.get("/fetch_routines", verifyToken, FETCH_ROUTINES);
/**
 * @swagger
 * /routine/fetch_routines:
 *   post:
 *     summary: Fetch All User Routines
 *     tags:
 *       - Fetch Routine
 *     requestParams:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *     responses:
 *       200:
 *         description: Routines Fetched successfully
 *       400:
 *         description: Bad Request
 */
router.get("/fetch_routine", verifyToken, FETCH_ROUTINE_INFO);
/**
 * @swagger
 * /routine/fetch_routine:
 *   post:
 *     summary: Fetch One User Routine Info
 *     tags:
 *       - Fetch Routine
 *     requestParams:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *               routine_title:
 *                 type: string
 *     responses:
 *       200:
 *         description: Routine Fetched successfully
 *       400:
 *         description: Bad Request
 */
router.delete("/delete_routine_by_name", verifyToken, DELETE_ROUTINE_BY_NAME);
/**
 * @swagger
 * /routine/delete_routine_by_name:
 *   post:
 *     summary: Delete One Routine By Name
 *     tags:
 *       - Delete One Routine
 *     requestParams:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *               routine_title:
 *                 type: string
 *     responses:
 *       200:
 *         description: Routine Deleted successfully
 *       400:
 *         description: Bad Request
 */

router.delete("/delete_routines", verifyToken, DELETE_ROUTINE_ALL);
/**
 * @swagger
 * /routine/delete_routines:
 *   delete:
 *     summary: Delete All Routine
 *     tags:
 *       - Delete All Routine
 *     requestParams:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *     responses:
 *       200:
 *         description: Routines Deleted successfully
 *       400:
 *         description: Bad Request
 */

router.post("/update_routine", verifyToken, UPDATE_ROUTINE);
/**
 * @swagger
 * /routine/update_routine:
 *   post:
 *     summary: Update Routine Exercise
 *     tags:
 *       - Update Routine Exercise
 *     requestParams:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *               routine_exercise:
 *                 type: array
 *                 item:
 *                   type: object
 *                   properties:
 *                    exercise_title: String
 *                    exercise_type: String
 *                    exercise_reps: Number
 *                    exercise_sets: Number
 *     responses:
 *       200:
 *         description: Routines Deleted successfully
 *       400:
 *         description: Bad Request
 */

module.exports = router;
