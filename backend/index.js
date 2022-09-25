const express=require('express')
const app=express()
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser=require('cookie-parser')
const userRouter=require('./routes/user')
require('dotenv').config()
const mongoose=require('mongoose')

//mongodb datas
const url = process.env.MONGODB_URL;
const connectionParams={
  useNewUrlParser: true,
  
  useUnifiedTopology: true 
}

//mongodb atlas mongoose connecting
mongoose.connect(url,connectionParams)
  .then( () => {
      console.log('Connected to the database ')
  })
  .catch( (err) => {
      console.error(`Error connecting to the database. n${err}`);
  })


app.use(cors({credentials: true,origin:true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())


app.use('/',userRouter)


//error handling
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