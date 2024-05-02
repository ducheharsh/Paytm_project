const express = require("express")
const router = express.Router()
const userRouter = require("./user")
const userAccount = require("./account")

router.use('/user', userRouter)
router.use('/account', userAccount)













module.exports = router