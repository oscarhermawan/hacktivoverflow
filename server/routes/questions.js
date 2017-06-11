const express = require('express')
const router = express.Router()
const api = require('../controllers/questionController')
const jwt = require('../helpers/jwt_verify')

router.get('/', api.getAll)
router.get('/:id', api.getById)
router.post('/', jwt.verifyToken, api.insertQuestion)
router.get('/check/:id', jwt.verifyId) //check id
router.put('/:id', jwt.verifyToken, api.updateQuestion) //update question
router.delete('/:id', jwt.verifyUpdateDelete, api.deleteQuestion)
router.post('/vote', jwt.verifyToken, api.voteQuestion)

module.exports = router
