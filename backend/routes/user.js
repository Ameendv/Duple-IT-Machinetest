const express=require('express')
const app =  express()
const userController=require('../controllers/user/user')

app.get('/',userController.userSignin)

module.exports=app