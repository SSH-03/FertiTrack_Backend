import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    confirmPassword:{type:String, required:true},
    billingData:{type:Object, default:{}}

}, {minimize:false})
// minimize:false -> billingData will be created without any data 

const userModel = mongoose.models.user || mongoose.model("user", userSchema)

export default userModel