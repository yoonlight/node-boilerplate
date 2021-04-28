const express = require('express')
const myEmitter = require('../event')

const router = express.Router()

router.get('/greet', async (req, res) => {
  const greet = 'hello wolrd!'
  myEmitter.emit('MQ', greet)
  res.json(greet)
})

module.exports = router
