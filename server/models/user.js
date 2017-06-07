const mongoose = require('mongoose')
const Schema = mongoose.Schema

var userSchema = new Schema({
  username:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  name:{
    type:String,
    required:true
  },
  photo:{
    type:String,
    default:'https://tracker.moodle.org/secure/attachment/30912/f3.png'
  },
  member_id:{
    type:String
  },
  createdAt:{
    type:Date,
    default:Date.now
  },
  updatedAt:{
    type:Date,
    default:Date.now
  }
})

var User = mongoose.model('User', userSchema)

module.exports = User
