const createError=require('../../errorStructure/errors')
const bcrypt=require('bcrypt')
const User=require('../../models/userModel')
const Video=require('../../models/videoModels')

const jwt=require('jsonwebtoken')

module.exports={
userSignup:async(req,res,next)=>{
    const userExist=await User.findOne({email:req.body.email})
    if(userExist) return res.status(409).json("User already registered,please login ")
    

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    req.body.confirmPassword = null;

    User.create(req.body).then((response)=>{
        res.sendStatus(200)
    }).catch((error)=>{
        res.status(500).json('Something went wrong')
    })
    
},
    userLogin: async (req, res, next) => {
        try {
            const userExist = await User.findOne({ email: req.body.email })
            if (userExist) {
                if (await bcrypt.compare(req.body.password, userExist.password)) {
                    const userData = { email: userExist.email ,name:userExist.name}
                    const accessToken = generateAccessToken(userData)



                    console.log(accessToken, userData)
                    res.status(200).json({name:userData.name,token:accessToken})


                } else {
                    return res.status(404).json('Incorrect Password')
                }
            } else {
                return res.status(404).json('User not registered')
            }
        } catch (error) {
            console.log(error)
        }
}
}

function generateAccessToken(user) {
    
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {algorithm:'HS256', expiresIn: "10m" });
  }