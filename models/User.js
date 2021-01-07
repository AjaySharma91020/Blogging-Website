const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = Schema({
     name : {
        type:String,
        trim:true,
        required:true
     },
     email : {
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
     },
     password : {
         type:String,
         required:true
     }
})

const User = mongoose.model('User',UserSchema)
module.exports = {User}