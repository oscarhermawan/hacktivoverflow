var db = require('../models/answer')
const methods = {}

//ANSWER ANSWER
methods.insertAnswer = function(req, res){
  var answerInput = new db({
    question_id:req.body.question_id,
    answer_by:req.decoded.id,
    description:req.body.description
  })
  console.log('masuk controller', answerInput);
  answerInput.save(function(err,answerInput){
    if(err){
      res.send(err)
    } else {
      res.send(answerInput)
    }
  })
}

methods.getByIdQuestion =function(req,res){
  db.find({'question_id._id':req.headers.id})
  .populate('question_id answer_by', 'name photo')
  .exec((error, records)=>{
    if(error){
      res.send(error)
    } else {
      res.send(records)
    }
  })
}

methods.getAll =function(req,res){
  db.find({})
  .populate('question_id answer_by', 'name photo')
  .exec((error, records)=>{
    if(error){
      res.send(error)
    } else {
      res.send(records)
    }
  })
}//GET ALL

//DELETE ANSWER

//DELETE ANSWER
methods.deleteAnswer = function(req,res) {
  db.findByIdAndRemove(req.params.id, function(err, result){
    if(!err){
      res.send(result)
    } else {
      res.send(err)
    }
  })
}//DELETE ANSWER
//
// methods.deleteAnswer = function(req, res){
//   db.findByIdAndUpdate(req.params.id, {$pull: { answers: { _id: req.params.idAnswer} }})
//   .exec((error, record)=>{
//     if(error){
//       res.send(error)
//     } else {
//       res.send(record)
//     }
//   })
// }

module.exports = methods
