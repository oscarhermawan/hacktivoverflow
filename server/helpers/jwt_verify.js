var express = require('express')
var jwt = require('jsonwebtoken')
var methods = {}

methods.verifyToken = function (req, res, next){
  // console.log('body', req.body.idquestion);
  // console.log('headers', req.headers);
  jwt.verify(req.headers.token, 'secret', (err, decoded)=>{
    if(decoded){
      req.decoded = decoded
      next();
    }
    else{
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

module.exports = methods
