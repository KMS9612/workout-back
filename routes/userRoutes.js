const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userControllers");

router.post(`/CREATE_USER`, UserController.CREATE_USER);

router.get(`/fetchUsers`, UserController.FETCH_USERS);
module.exports = router;
