const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true,unique:true },
    
    password: { type: String },
    confirmPassword: { type: String },
   
  },
  { collection: "user" }
);

const model = mongoose.model("UserData", user);

module.exports = model;