const createError=require('../../errorStructure/errors')
const bcrypt=require('bcrypt')
const User=require('../../models/userModel')

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
    
}
}