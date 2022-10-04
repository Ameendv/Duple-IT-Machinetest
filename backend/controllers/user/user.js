const createError = require("../../errorStructure/errors");
const bcrypt = require("bcrypt");
const User = require("../../models/userModel");
const Video = require("../../models/videoModels");
const multer = require('multer')
const fs=require('fs')
const jwt = require("jsonwebtoken");
const path = require('path')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'videos')
},
filename: function (req, file, cb) {

  req.fileName=file.originalname
  req.extName=file.originalname.split('.')[1]
  cb(null, req.fileName )
}
})

var upload = multer({ storage: storage }).single('file')

module.exports = {
  userSignup: async (req, res, next) => {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist)
      return res.status(409).json("User already registered,please login ");

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    req.body.confirmPassword = null;

    User.create(req.body)
      .then((response) => {
        res.sendStatus(200);
      })
      .catch((error) => {
        res.status(500).json("Something went wrong");
      });
  },
  userLogin: async (req, res, next) => {
    try {
      const userExist = await User.findOne({ email: req.body.email });
      if (userExist) {
        if (await bcrypt.compare(req.body.password, userExist.password)) {
          const userData = { email: userExist.email, name: userExist.name };
          const accessToken = generateAccessToken(userData);

          console.log(accessToken, userData);
          res.status(200).json({ name: userData.name, token: accessToken });
        } else {
          return res.status(404).json("Incorrect Password");
        }
      } else {
        return res.status(404).json("User not registered");
      }
    } catch (error) {
      console.log(error);
    }
  },
  uploadVideo: async (req, res) => {
   
    const { token } = req.headers;

     upload(req, res,async function (err) {
           if (err instanceof multer.MulterError) { 
            return res.status(500).json(err)
           } else if (err) {
             return res.status(500).json(err)
           }
           
           try {
            const { email } = await jwt.verify(
              token,
              process.env.ACCESS_TOKEN_SECRET
            );
            User.findOne({ email: email }).then((response) => {
              if (!response) {
                return res.status(400).json("Not authorized request");
              }
              const videoDetails = { fileName: req.fileName,extension:req.extName, uploadedUser: response._id };
              Video.create(videoDetails)
                .then((response) => {
                  const currentName=path.join(__dirname,"../../videos",response.fileName)
                  const newName=path.join(__dirname,"../../videos",(response._id).toString()+'.'+response.extension)
                 fs.rename(currentName,newName,(err)=>{
                  if(err){
                   return console.log(err)
                  }else{
                    console.log('video renamed successfully')
                  }
                 })
                 return res.status(200).json("Video added successfully");
                })
                .catch((error) => {
                  console.log(error);
                  res.status(500).json("something went wrong");
                });
            });
          } catch (error) {
            console.log(error);
          }

      // return res.status(200).send(req.file)

    })

   
  },
  getTrendingVideos: (req, res) => {
    Video.aggregate([
      {
        $lookup: {
          from: "user",
          localField: "uploadedUser",
          foreignField: "_id",
          as: "uploadedUser",
        },
      },
    ])
      .then(async (response) => {
        for (let index in response) {
          const total = response[index].viewers.reduce((sum, data) => {
            return sum + data;
          });
          response[index].trendingStatus = total * response[index].viewTime;
          response[index].totalView = total;
        }

        response.sort((a, b) => {
          return b.trendingStatus - a.trendingStatus;
        });

        console.log(response);

        res.status(200).json(response);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  setViewers: (req, res) => {
    console.log(req.body);
    Video.updateOne(
      { _id: req.body.id },
      {
        $inc: { viewTime: req.body.viewedTime },
        $push: { viewers: req.body.viewers },
      }
    ).then((response) => {
      console.log(response);
    });
  },
};

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: "10m",
  });
}
