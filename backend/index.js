const express=require('express')
const app=express()
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser=require('cookie-parser')
const userRouter=require('./routes/user')
require('dotenv').config()
const mongoose=require('mongoose')


mongoose.connect('mongodb://localhost:27017/DupleITmachineTest').then((done,error)=>{
    if(error){
        console.log(error)
    }else{
        console.log('Database is connected')
    }
})



app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())


app.use('/',userRouter)



app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
  
    const errorMessage = err.message || "Something went wrong !"
  
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack
    })
  })


const PORT = process.env.PORT || 5000

app.listen(PORT, () => { console.log(`Server started at port ${PORT}`) })  