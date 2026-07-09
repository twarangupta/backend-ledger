const express = require("express")
const authRouter = require("./routes/auth.route")
const cookieParser = require("cookie-parser")
const accountRouter = require("./routes/account.routes")

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
/**
 * Post routes
 * {protected rutes which require valid toke}
 * 
 *  */
app.use("/api/accounts", accountRouter)


module.exports = app