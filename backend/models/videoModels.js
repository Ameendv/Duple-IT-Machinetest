const mongoose = require("mongoose");

const video = new mongoose.Schema(
  {
    url: { type: String, required: true },

    uploadedUser:{type:mongoose.Types.ObjectId,ref:'user'},
    viewers:{type:Array},

   
  },
  { collection: "video" }
);

const model = mongoose.model("Vidoes", video);

module.exports = model;