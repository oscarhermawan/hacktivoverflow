var db = require('../models/user')
var passwordHash = require('password-hash')
var jwt = require('jsonwebtoken')
const methods = {}

//GET ALL USER
methods.getAllUsers = function(req, res) {
  db.find(function(err, User) {
    if(err){
      console.log(err);
    } else {
      res.send(User)
    }
  })
}//GET ALL USER

//GET ONE BY ID
methods.getById = function(req,res){
  db.findById(req.params.id, function(error, record){
    if(error){
      res.send(error)
    } else {
      res.send(record)
    }
  })
}//GET ONE BY ID

//INSERT USER
methods.insertUser = function(req, res){
  console.log('gebleg',req.body);
  var userInput = new db({
    username:req.body.username,
    password:passwordHash.generate(req.body.password),
    name : req.body.name,
  })
  userInput.save(function(err,result){
    if(err){
      res.send(err)
    } else {
      res.send(result)
    }
  })
}//INSERT USER

//DELETE USER
methods.deleteUser = function(req,res) {
  db.findByIdAndRemove(req.params.id, function(err, result){
    if(!err){
      res.send('berhasil hapus')
    } else {
      res.send(err)
    }
  })
}//DELETE USER

//LOCAL LOGIN
methods.signIn = function (username, password, next) {
  var getUser = db.findOne({username : username})
  getUser.exec(function(err, user){
    if(passwordHash.verify(password, user.password)){
      let User = {
        id:user.id, // TERNYATA BISA user.id / user._id di mongoose
        username:user.username,
        name:user.name
      }
      let token = jwt.sign(User, 'secret')
       next(null, {message: 'Berhasil Login', token })
    } else {
      next(null, {message: 'Password Salah'})
    }
  })
}//LOCAL LOGIN

module.exports = methods
