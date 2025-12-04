import mongoose from "mongoose";

// define the person schema

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    age:{
        type : Number,
    
    },
    usertype:{
        type : String,
        enum: ['students','admin','teachers'],
 },
    mobile : {
        type : String,
        required : true
    },
    email : {
        type: String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    createdAt: {
        type:Date,
        default:Date.now()
    }
    
});

// create person model

export const User = mongoose.model('User',userSchema)