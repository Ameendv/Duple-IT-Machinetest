const mongoose = require("mongoose");

const video = new mongoose.Schema(
  {
    fileName: { type: String, required: true },

    uploadedUser:{type:mongoose.Types.ObjectId,ref:'user'},
    viewers:{type:Array,default:0},
    viewTime:{type:Number,default:0},
    extension:{type:String}

   
  },
  { collection: "video" }
);

const model = mongoose.model("Vidoes", video);

module.exports = model;