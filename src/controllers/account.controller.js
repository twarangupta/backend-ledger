const accountModel = require("../models/account.model");

async function createUser(req, res) {
  const user = req.user;
  console.log("user.id",user.id)
  console.log("user._id",user._id)
  const account = await accountModel.create({
    user: user._id,
  });
  res.status(201).json({
    message: "account created for user",
    account,
  });
}

module.exports = { createUser };
 