const passport = require('passport')
const { Router } = require('express')
const myEmitter = require('event')

class User {
  router
  constructor(container) {
    this.router = Router()
    this.query = container.get('authController')
    this.router.get('/', this.list)

    this.router.get('/profile/:id',
      passport.authenticate('jwt', {
        failureRedirect: '/api/auth/fail'
      }),
      this.getProfile
    )

    this.router.patch('/:id', this.updateProfile)
  }

  list = async (req, res) => {
    try {
      const q = req.query
      const result = await this.query.list(q)
      myEmitter.emit('Slack', result)
      myEmitter.emit('MQ', result)
      res.json(result)
    } catch (error) {
      console.error(error)
    }
  }

  getProfile = async (req, res, next) => {
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
  }

  updateProfile = async (req, res) => {
    const body = req.body
    const id = req.params.id
    try {
      const result = await this.query.update(id, body)
      res.json(result)
    } catch (e) {
      res.send(e)
    }
  }
}

module.exports = {
  User
};
