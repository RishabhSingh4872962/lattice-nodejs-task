import mongoose from "mongoose";

import bcrypt from "bcrypt"
const psychiatristSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    select:false
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 15,
    select:false
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
    select:false
  },
}).pre("save",async function (next) {
  console.log(this.isModified("password"));
  if (this.isModified("password")) {
   this.password=await bcrypt.hash(this.password,10);
  }
  next()
});

export const Psychiatrist = mongoose.model("Psychiatrist", psychiatristSchema);
