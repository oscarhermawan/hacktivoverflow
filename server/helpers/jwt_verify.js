var express = require('express')
var jwt = require('jsonwebtoken')
var methods = {}

methods.verifyToken = function (req, res, next){
  jwt.verify(req.headers.token, 'secret', (err, decoded)=>{
    if(decoded){
      console.log('masuk berhasil');
      req.decoded = decoded
      next();
    }
    else{
      console.log('error');
      res.send(err)
    }
  })
}

methods.verifyUpdateDelete = function (req, res, next){
  jwt.verify(req.headers.token, 'secret', (err, decoded)=>{
    if(decoded.id === req.headers.asked_by || decoded.id === req.headers.answer_by ){
      req.decoded = decoded
      next();
    }
    else{
      res.send('Gagal')
    }
  })
}

methods.verifyId = function (req, res, next){
  console.log('masuk verify id');
  jwt.verify(req.headers.token, 'secret', (err, decoded)=>{
    if(decoded.id === req.params.id ){
      res.send('Berhasil')
    }
    else{
      res.send('Gagal')
    }
  })
}

module.exports = methods
