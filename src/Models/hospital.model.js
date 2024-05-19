import mongoose from "mongoose";

const hospitalSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    
})

export const Hospital = mongoose.model('Hospital', hospitalSchema);