const { Router } = require('express')
const { Auth } = require('./auth');
const { User } = require('./user');
class Routes {
  router
  constructor(container) {
    this.router = Router()
    this.connection = container.get('sql').conn
    this.auth = new Auth(container).router
    this.user = new User(container).router
    this.router.use('/user', this.user)
    this.router.use('/auth', this.auth)
    this.router.get('/synchronize', async (req, res) => {
      await this.connection.synchronize();
      res.send('Complete!')
    })
  }
}
module.exports = {
  Routes
}
