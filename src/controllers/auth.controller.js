const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

/**
 * user register controller // JS docstring
 * POST /api/auth/register
 */

async function userRegisterController(req, res) {
  const { email, name, password } = req.body;

  const checkEmail = await userModel.findOne({ email });
  if (checkEmail) {
    return res.status(409).json({
      message: "User already registered",
    });
  }
  try {
    const User = await userModel.create({
      email,
      name,
      password,
    });
    console.log("User", User);
    const token = await jwt.sign({ id: User._id },process.env.JWT_SECRET);
    res.cookie("token", token);
    res.status(201).json({
      message: "User registered successfully",
      user: {
        email,
        name,
      },
    });
  } catch (err) {
    console.log("Error creating user", err);
    res.sned("error creating user")
  }
}

module.exports = { userRegisterController };
