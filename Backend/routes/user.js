const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const z = require("zod");
const { User, Account } = require("../db");
const { JWT_SECRET } = require("../config");
const { userAuthetication } = require("../middlewares/userAuthentication");
router.use(express.json())

const UserSchemaZod = z.object({
    firstName: z.string().max(50, {message:'is very loooooong'}),
    lastName: z.string().max(50, {message:'is very loooooong'}),
    username: z.string().email({ message: 'must be a valid email' }),
    password: z.string().min(8, { message: 'is Too short' }),
  });

  const UserUpdateSchemaZod = z.object({
    firstName: z.optional(z.string().max(50, {message:'Long name huh'})),
    lastName: z.optional(z.string().max(50, {message:'Long name huh'})),
    username: z.optional(z.string().email({ message: 'Must be a valid email' })),
    password: z.optional(z.string().min(8, { message: 'Too short' })),
  });

  const LoginSchemaZod = z.object({    
    username: z.string().email({ message: 'must be a valid email' }),
    password: z.string().min(8, { message: 'is Too short' }),
})


router.post("/signup", async(req, res) =>{
    const parsed = UserSchemaZod.safeParse(req.body);

    if(!parsed.success){
        res.status(400).json({ error: parsed.error });
        return;
    }

    const { username, password, firstName, lastName } = parsed.data;

    const newUser = User({
        username,
        firstName,
        lastName,
    })

    
    var HashedPass = await newUser.createHash(req.body.password)
    newUser.password = HashedPass;

    await newUser.save();
    
    const userId = newUser._id
    const newAccount = Account.create({
        userId:userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({userId}, JWT_SECRET)

    res.json({
        msg:"User created successfully",
        token: token
    })

})


router.post("/signin", async(req, res)=>{

    const parsed = LoginSchemaZod.safeParse(req.body);

    if(!parsed.success){
        res.status(400).json({ error: parsed.error });
        return;
    }

        const username = req.body.username

        const user = await User.findOne({
            username
        })

        if(!user){
            res.status(404).json({
                msg:"User Not Found"
            })
            return;
        }
        
        const userId = user._id

            if(await user.validatePassword(req.body.password)){
                
                const token = jwt.sign({userId}, JWT_SECRET);
                res.json({
                    token
                })
            }else{
                res.json({
                    msg:"Invalid password"
                })
            }
        
})

router.post("/", userAuthetication , async(req, res)=>{
    const elule = UserUpdateSchemaZod.safeParse(req.body);
    const userId = req.userId
    
    console.log(elule.data)
    if(!elule.success){
        res.json({
            error:elule.error
        })
    }

    if(elule.data.password){
        const user = await User.findOne({userId})
        var hashedpass = await user.createHash(elule.data.password);
        elule.data.password = hashedpass

        const updateUser = await User.updateOne(
            {userId}
            ,
            elule.data
        )

    }

    try{
    const updateUser = await User.updateOne(
        {username}
        ,
        elule.data
    )

    res.json({
        msg:"data updated"
    })
}catch(err){
    res.json({
        msg:err,
        msg2:"Something went wrong"
    })
}

})


router.get("/bulk/", userAuthetication, async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})











module.exports = router