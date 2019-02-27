const express = require('express')
const controller = require('../controllers/poll')
const router = express.Router()

router.get('/', controller.create)
router.get('/show/:id', controller.index)
router.post('/', controller.store)
router.get('/:id', controller.show)
router.post('/vote', controller.storeVote)

module.exports = router
