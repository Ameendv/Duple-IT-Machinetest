const express=require('express')
const app =  express()
const userController=require('../controllers/user/user')

app.post('/api/user-signup',userController.userSignup)



module.exports=app