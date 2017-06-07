var db = require('../models/question')
var passwordHash = require('password-hash')
var jwt = require('jsonwebtoken')
const methods = {}

//INSERT QUESTIONS
methods.insertQuestion = function(req, res){
  db.create(req.body, function(err, data){
    if(err){
      res.send(err)
    } else {
      res.send(data)
    }
  })
}//INSERT QUESTIONS


//GET ONE BY ID
methods.getById = function(req,res){
  db.findOne({_id:req.params.id})
  .populate('asked_by votes.voted_by answers.answer_by', 'username')
  .exec((error, records)=>{
    if(error){
      res.send(error)
    } else {
      res.send(records)
    }
  })
}//GET ONE BY ID

//GET ALL
methods.getAll =function(req,res){
  db.find({})
  .populate('asked_by votes.voted_by answers.answer_by', 'username')
  .exec((error, records)=>{
    if(error){
      res.send(error)
    } else {
      res.send(records)
    }
  })
}//GET ALL

//UPDATE QUESTIONS
methods.updateQuestion = function(req,res) {
  db.findByIdAndUpdate(req.params.id, {$set : req.body }, {new:true})
  .exec((error, record)=>{
    if(error){
      res.send(error)
    } else {
      res.send(record)
    }
  })
}//UPDATE QUESTIONS


//DELETE QUESTIONS
methods.deleteQuestion = function(req,res) {
  db.findByIdAndRemove(req.params.id, function(err, result){
    if(!err){
      res.send('berhasil hapus')
    } else {
      res.send(err)
    }
  })
}//DELETE QUESTIONS

////////////////////////////////////////////////////////////////////////////////

//VOTE QUESTIONS
methods.voteQuestion = function(req,res){
  db.findById(req.params.id)
  .exec((error, record)=>{
    if(error){
      res.send(error)
    } else {
      let exist = record.votes.some(val=>{
        return val.voted_by == req.body.voted_by
      })

      if(exist){
        res.json({error:true, message:'You have already voted'})
      } else {
        record.votes.push(req.body)
        record.save((error, record)=>{
          if(error){
            res.send(error)
          } else {
            res.send(record)
          }
        })
      }
    }
  })
}

module.exports = methods
