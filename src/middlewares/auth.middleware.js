const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function validateUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded; // Store the decoded user information in the request object for further use
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized or invalid token",
    });
  }
}
module.exports = { validateUser };
