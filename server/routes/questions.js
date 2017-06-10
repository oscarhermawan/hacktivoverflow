const express = require('express')
const router = express.Router()
const api = require('../controllers/questionController')
const jwt = require('../helper/jwt_verify')

router.get('/', api.getAll)
router.get('/:id', api.getById)
router.post('/', jwt.verifyToken, api.insertQuestion)
router.put('/:id', api.updateQuestion)
router.delete('/:id', api.deleteQuestion)

//VOTE UP
router.post('/:id/vote', api.voteQuestion)

module.exports = router
