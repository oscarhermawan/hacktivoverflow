const express = require('express')
const router = express.Router()
const api = require('../controllers/answerController')
const jwt = require('../helpers/jwt_verify')

//ANSWERS
router.get('/', api.getAll) // :id = id dari ask
router.get('/question/:id', api.getByIdQuestion) // Get from id ask

router.post('/', jwt.verifyToken, api.insertAnswer)
router.delete('/:id', jwt.verifyUpdateDelete, api.deleteAnswer)

//VOTE UP
// router.post('/:id/vote', api.voteQuestion)

module.exports = router
