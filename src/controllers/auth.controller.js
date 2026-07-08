const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const emailService = require("../services/mail.service")

/**
 * user register controller // JS docstring
 * POST /api/auth/register
 */
console.log(process.env.CLIENT_ID);
console.log(process.env.CLIENT_SECRET?.substring(0, 10));
console.log(process.env.EMAIL_USER);
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
    const token = await jwt.sign({ id: User._id }, process.env.JWT_SECRET);
    res.cookie("token", token);
    res.status(201).json({
      message: "User registered successfully",
      user: {
        email,
        name,
      },
    });
    await emailService.sendRegistrationEmail(User.email,User.name)
  } catch (err) {
    console.log("Error creating user", err);
    res.sned("error creating user");
  }
}

async function userLoginController(req, res) {
  console.log(req.body);
  const { email, password } = req.body;

  const User = await userModel.findOne({ email }).select("+password");
  console.log("User", User);
  if (!User) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }
  // const hashedPassword = bcrypt.hash(password,10)
  // const checkPassword = await userModel.findOne({email, hashedPassword})
  // if(!checkPassword){
  //   return res.status(401).json({
  //     message: "Invalid Email or password"
  //   })
  // }
  const result = await User.comparePassword(password);
  console.log("result", result);
  if (!result) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }
  const token = await jwt.sign({ email }, process.env.JWT_SECRET);
  res.cookie("token", token);
  res.status(201).json({
    message: "User logged in successfully"
  })
}

module.exports = { userRegisterController, userLoginController };
