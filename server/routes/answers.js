const express = require('express')
const router = express.Router()
const api = require('../controllers/answerController')
const jwt = require('../helper/jwt_verify')

//ANSWERS
router.get('/', api.getAll) // :id = id dari ask
router.get('/question/:id', api.getByIdQuestion) // Get from id ask

router.post('/', jwt.verifyToken, api.insertAnswer)
router.delete('/:id/answer/:idAnswer', api.deleteAnswer)  //:id = id dari ask

//VOTE UP
// router.post('/:id/vote', api.voteQuestion)

module.exports = router
