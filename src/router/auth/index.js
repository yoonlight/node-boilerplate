// @ts-check
const jwt = require('jsonwebtoken')
const passport = require('passport')
const { Router, Request, Response, NextFunction } = require('express')
const myEmitter = require('event')
const { Controller } = require('controller');
const { Container } = require('typedi');
class Auth {
  router
  /**
   * @param {Container} container 
   */
  constructor(container) {
    this.router = Router()
    /**
     * @type {Controller}
     */
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

    this.router.post('/register', this.signUp)
  }
  /**
  * @param {Request} req
  * @param {Response} res
  * @param {NextFunction} next
  */
  signUp = async (req, res, next) => {
    try {
      const ip = req.headers['x-real-ip'] || req.socket.remoteAddress;
      req.body.role = 'member'
      /**
       * 
       * @param {Controller} query
       */
      const result = await this.query.add(req.body)
      myEmitter.emit('MQ', `${req.body.username}(${ip}) Sign Up!`)
      res.json(result)
    } catch (error) {
      next(error)
    }
  }
  /**
  * @param {Request} req
  * @param {Response} res
  * @param {NextFunction} next
  */
  isActivate(req, res, next) {
    const user = req.user
    // @ts-ignore
    if (!user.isActivate) {
      res.status(401).send("this account can't access")
      return
    }
    next()
  }
  /**
  * @param {Request} req
  * @param {Response} res
  */
  login(req, res) {
    const user = req.user
    const ip = req.headers['x-real-ip'] || req.socket.remoteAddress;
    const option = {
      expiresIn: '5m'
    }
    const secretOrKey = process.env.SERVER_SECRET_KEY
    const token = jwt.sign({
      // @ts-ignore
      uid: user.id
    }, secretOrKey, option)
    // @ts-ignore
    const message = { title: 'Login', text: `${user.username}(${ip}) Login Success!` }
    myEmitter.emit('Slack', message)
    res.json({
      userInfo: user,
      accessToken: token
    })
  }
}

module.exports = {
  Auth
};
