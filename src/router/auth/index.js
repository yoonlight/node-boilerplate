const jwt = require('jsonwebtoken')
const passport = require('passport')
const { Router } = require('express')
const myEmitter = require('event')
class Auth {
  router
  constructor(container) {
    this.router = Router()
    this.query = container.get('authController')
    this.router.post(
      '/login',
      passport.authenticate('local', {
        failureRedirect: 'fail'
      }),
      this.isActivate,
      this.login
    )

    this.router.get('/logout', (req, res) => {
      req.logout()
      res.json('logout')
    })

    this.router.get('/fail', (req, res) => {
      res.status(400).json('fail')
    })

    this.router.post('/register', async (req, res, next) => {
      try {
        const ip = req.headers['x-real-ip'] || req.socket.remoteAddress;
        req.body.role = 'member'
        const result = await this.query.add(req.body)
        myEmitter.emit('MQ', `${req.body.username}(${ip}) Sign Up!`)
        res.json(result)
      } catch (error) {
        next(error)
      }
    })
  }
  
  isActivate(req, res, next) {
    const user = req.user
    if (!user.isActivate) {
      res.status(401).send("this account can't access")
      return
    }
    next()
  }

  login(req, res) {
    const user = req.user
    const ip = req.headers['x-real-ip'] || req.socket.remoteAddress;
    const option = {
      expiresIn: '5m'
    }
    const secretOrKey = process.env.SERVER_SECRET_KEY
    const token = jwt.sign({
      uid: user.id
    }, secretOrKey, option)
    myEmitter.emit('MQ', `${user.username}(${ip}) Login Success!`)
    res.json({
      userInfo: user,
      accessToken: token
    })
  }
}

module.exports = {
  Auth
};
