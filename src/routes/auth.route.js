const express = require("express");
const authController = require("../controllers/auth.controller");
const { validateUser } = require("../middlewares/auth.middleware");

const router = express.Router();
router.post("/register", authController.userRegisterController);
module.exports = router;
