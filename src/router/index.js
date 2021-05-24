const express = require('express')
const myEmitter = require('../event')
import {getConnection} from "typeorm";
const router = express.Router()

router.get('/greet', async (req, res) => {
  const greet = 'hello wolrd!'
  myEmitter.emit('MQ', greet)
  res.json(greet)
})

router.get('/synchronize', async (req, res) => {
  const connection = getConnection();
  await connection.synchronize();
})

module.exports = router
