const passport = require('passport')
const { Router } = require('express')
const myEmitter = require('event')

class User {
  router
  constructor(container) {
    this.router = Router()
    this.query = container.get('authController')
    this.router.get('/', async (req, res, next) => {
      try {
        const q = req.query
        const result = await this.query.list(q)
        myEmitter.emit('Slack', result)
        myEmitter.emit('MQ', result)
        res.json(result)
      } catch (error) {
        console.error(error)
      }
    })

    this.router.get('/profile/:id',
      passport.authenticate('jwt', {
        failureRedirect: '/api/auth/fail'
      }),
      async (req, res, next) => {
        const headers = req.headers.authorization
        if (headers) {
          console.log(headers);
        }
        try {
          const result = await this.query.get(req.params.id)
          res.json(result)
        } catch (error) {
          console.log(error)
        }
      })
  }
}

module.exports = {
  User
};
