const mongoose = require('mongoose')
const Schema = mongoose.Schema

var voteSchema = new Schema({
  number:{
    type:Number,
    enum:[1,-1]
  },
  voted_by:{
    type:Schema.Types.ObjectId,
    ref:'User'
  }
}, {_id:false})

var answerSchema = new Schema({
  question_id :{
    type: Schema.Types.ObjectId,
    ref:'Question'
  },
  answer_by :{
    type: Schema.Types.ObjectId,
    ref:'User'
  },
  description:{
    type:String
  },
  votes:[voteSchema],
  createdAt:{
    type:Date,
    default:Date.now
  },
  updatedAt:{
    type:Date,
    default:Date.now
  }
})

var Answer = mongoose.model('Answer', answerSchema)
module.exports = Answer
