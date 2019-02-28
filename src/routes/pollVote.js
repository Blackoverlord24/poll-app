const express = require('express')
const controller = require('../controllers/pollVote')
const router = express.Router()

router.post('/', controller.store)
router.get('/:poll_id', controller.show)

module.exports = router
