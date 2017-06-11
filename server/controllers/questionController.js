var db = require('../models/question')
var passwordHash = require('password-hash')
var jwt = require('jsonwebtoken')
const methods = {}

//INSERT QUESTIONS
methods.insertQuestion = function(req, res){
  var questionInput = new db({
    asked_by:req.decoded.id,
    title:req.body.title,
    description:req.body.description
  })
  questionInput.save(function(err,questionInput){
    if(err){
      res.send(err)
    } else {
      db.findOne({_id:questionInput._id})
      .populate('asked_by votes.voted_by', 'name photo')
      .exec((error, records)=>{
        if(error){
          res.send(error)
        } else {
          res.send(records)
        }
      })
    }
  })
}//INSERT QUESTIONS


//GET ONE BY ID
methods.getById = function(req,res){
  db.find({_id:req.params.id})
  .populate('asked_by votes.voted_by', 'name photo')
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
  .populate('asked_by votes.voted_by', 'name photo')
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
  db.findById(req.body.idQuestion, function(err, result){
    var update = {
      asked_by:result.asked_by,
      title:req.body.title || result.title,
      description:req.body.description || result.description,
      votes:result.votes
    }
    db.findByIdAndUpdate(req.body.idQuestion, update, {new:true}, function(error, data){
      if(!err){
        db.findOne({_id:data._id})
        .populate('asked_by votes.voted_by', 'name photo')
        .exec((gagal, hasil)=>{
          if(error){
            res.send(gagal)
          } else {
            res.send(hasil)
          }
        })
      }else{
        res.send(error)
      }
    })
  })
}//UPDATE QUESTIONS

//DELETE QUESTIONS
methods.deleteQuestion = function(req,res) {
  db.findByIdAndRemove(req.params.id, function(err, result){
    if(!err){
      res.send(result)
    } else {
      res.send(err)
    }
  })
}//DELETE QUESTIONS


//VOTE QUESTIONS
methods.voteQuestion = function(req,res){
  db.findById(req.body.idquestion)
  .exec((error, record)=>{
    if(error){
      res.send(error)
    } else {
      let exist = record.votes.some(val=>{
        return val.voted_by == req.decoded.id
      })

      if(exist){
        res.json({error:true, message:'You have already voted'})
      } else {
        let votes = {
          voted_by:req.decoded.id
        }
        record.votes.push(votes)
        record.save((error, record)=>{
          if(error){
            res.send(error)
          } else {
            db.findOne({_id:record._id})
            .populate('asked_by votes.voted_by', 'name photo')
            .exec((error, records)=>{
              if(error){
                res.send(error)
              } else {
                res.send(records)
              }
            })
          }
        })
      }
    }
  })
}

module.exports = methods
