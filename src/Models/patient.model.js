
import bcrypt from "bcrypt"
import mongoose from "mongoose";
const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength:3
    },
    address: {
        type: String,
        required: true,
        minlength: 10
    },
    email: {
        type: String,
        required: true,
        unique: true,
        
    },
    phone: {
        countryCode:{
            type:String,
            required:true,
            default:"+91"
        },
        phoneNumber:{
            type:String,
            required:true,
            minlength:10
        } 
    },
    password: {
        type: String,
        required: true,
        minlength:8,
        maxlength:15,
        select:false
    },
    photo: {
        data: {
            type:Buffer,
            required:true,
            select:false
        },
        contentType: {
            type:String,
            required:true,
            select:false
        },

    },
    psychiatrists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Psychiatrist',
        required:true
    }]
}).pre("save",async function (next) {
    if (this.isModified("password")) {
     
   this.password=await bcrypt.hash(this.password,10);
    }
    next();
})
export const Patient = mongoose.model('Patient', patientSchema);
