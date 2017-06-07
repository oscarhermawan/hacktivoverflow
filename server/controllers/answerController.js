const methods = {}

//ANSWER ANSWER
methods.insertAnswer = function(req,res){
  db.findById(req.params.id)
  .exec((error, record)=>{
    if(error){
      console.log('ga masuk');
      res.send(error)
    } else {
      console.log('masuk sini');
      console.log(req.body);
      record.answers.push(req.body)
      record.save((error, record)=>{
        if(error){
          res.send(error)
        } else {
          res.send(record)
        }
      })
    }
  })
}

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
