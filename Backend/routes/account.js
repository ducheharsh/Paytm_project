
const express = require("express")
const { route } = require("./user")
const { userAuthetication } = require("../middlewares/userAuthentication")
const { Account, User } = require("../db")
const { default: mongoose } = require("mongoose")
const router = express.Router()
router.use(express.json())
const z = require("zod")


const amountSchema = z.number().lte(100000).positive();


router.get('/balance', userAuthetication, async(req, res)=>{

    const userId = req.userId

    const userAccount = await Account.findOne({
        userId
    })
    const userLogin = await User.findOne({
        _id:userId
    })

    const username = userLogin.firstName
    const balance = userAccount.balance

    res.status(200).json({
        username:username,
        balance:balance
    })
})


router.post('/transfer', userAuthetication, async(req, res)=>{

    console.log(req.body.amount)

    const parsed = amountSchema.safeParse(req.body.amount)

    if(!parsed.success){
        res.status(400).json({
            error:parsed.error
        })
        return;
    }

    const session = await mongoose.startSession();

    session.startTransaction();

    const fromAccount = req.userId
    const toAccount = req.body.userId
    const amount = req.body.amount

    const fromUser = Account.findOne({userId:fromAccount}).session(session)

    if(!fromUser || fromUser.balance < amount){
        await session.abortTransaction()
        res.json({
            msg:"Insufficient Balance"
        })
    }

    const findToAccount = await User.findOne({_id:toAccount}).session(session)

    if (!findToAccount){
        await session.abortTransaction();
        res.json({
            msg:"Invalid Account"
        })
    }


        await Account.updateOne({userId:fromAccount}, {"$inc":{balance: -amount}}).session(session)
        await Account.updateOne({userId:toAccount}, {"$inc":{balance: amount}}).session(session)

        await session.commitTransaction()
        res.json({
            message: "Transfer successful",
            To:findToAccount.firstName,
            amount:amount
        });



})







module.exports = router