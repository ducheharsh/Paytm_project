
const jwt = require("jsonwebtoken")
const { User } = require("../db")
const { verify } = require("argon2")
const { JWT_SECRET } = require("../config")


function userAuthetication (req, res, next){
    const pretoken = req.headers.authorization
    const token = pretoken.split(" ")[1]
    const decodedtoken = jwt.verify(token, JWT_SECRET)

    if(decodedtoken.userId){
        req.userId = decodedtoken.userId
        next()
    }else{
        console.log(decodedtoken.userId)
    res.json({
        
        msg:"User not Authenticated"
    })
}
}

module.exports ={
    userAuthetication
}