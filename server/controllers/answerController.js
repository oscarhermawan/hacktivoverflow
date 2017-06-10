var db = require('../models/answer')
const methods = {}

//ANSWER ANSWER
methods.insertAnswer = function(req, res){
  var answerInput = new db({
    question_id:'5938ead9c5e90d242a70aeb5',
    answer_by:'5938ea34c5e90d242a70aeb2',
    description:req.body.description
  })
  answerInput.save(function(err,answerInput){
    if(err){
      res.send(err)
    } else {
      res.send(answerInput)
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
methods.deleteAnswer = function(req, res){
  db.findByIdAndUpdate(req.params.id, {$pull: { answers: { _id: req.params.idAnswer} }})
  .exec((error, record)=>{
    if(error){
      res.send(error)
    } else {
      res.send(record)
    }
  })
}

module.exports = methods
