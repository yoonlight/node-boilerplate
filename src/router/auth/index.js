const jwt = require('jsonwebtoken')
const passport = require('passport')
const { Router } = require('express')
const { Model } = require('../../entity')
const { Controller } = require('../../controller')
const myEmitter = require('../../event')

const router = Router()
router.get('/', async (req, res, next) => {
  const query = new Controller(Model.User)
  try {
    const result = await query.list(req.query)
    res.json(result)
  } catch (error) {
    console.log(error)
  }
})

router.get('/profile/:id',
  passport.authenticate('jwt', { failureRedirect: '/api/auth/fail' }),
  async (req, res, next) => {
    const headers = req.headers.authorization
    if (headers) {
      console.log(headers);
    }
    const query = new Controller(Model.User)
    try {
      const result = await query.get(req.params.id)
      res.json(result)
    } catch (error) {
      console.log(error)
    }
})

router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: 'fail' }),
  (req, res) => {
    const user = req.user
    const ip = req.headers['x-real-ip'] || req.socket.remoteAddress;
    const option = { expiresIn: '5m' }
    const secretOrKey = process.env.SERVER_SECRET_KEY
    const token = jwt.sign({ uid: user.id }, secretOrKey, option)
    myEmitter.emit('MQ', `${user.username}(${ip}) Login Success!`)
    res.json(token)
  }
)

router.get('/logout', (req, res) => {
  req.logout()
  res.json('logout')
})

router.get('/fail', (req, res) => {
  res.status(400).json('fail')
})

router.post('/register', async (req, res, next) => {
  const query = new Controller(Model.User)
  try {
    const ip = req.headers['x-real-ip'] || req.socket.remoteAddress;
    req.body.role = 'member'
    const result = await query.add(req.body)
    myEmitter.emit('MQ', `${req.body.username}(${ip}) Sign Up!`)
    res.json(result)
  } catch (error) {
    next(error)
  }
})

module.exports = router
