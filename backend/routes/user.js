const express=require('express')
const app =  express()
const userController=require('../controllers/user/user')

app.post('/api/user-signup',userController.userSignup)

app.post('/api/user-login',userController.userLogin)

app.post('/api/upload-video',userController.uploadVideo)



module.exports=app