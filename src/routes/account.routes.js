const express = require("express");
const { validateUser } = require("../middlewares/auth.middleware");
const {createUser} = require("../controllers/account.controller")


const router = express.Router();

/**
 * Post routes
 * {protected rutes which require valid toke}
 *
 *  */
router.post("/",validateUser,createUser);

module.exports = router;
