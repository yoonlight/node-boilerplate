const { Router } = require('express')
const { Auth } = require('./auth');

class Routes {
  router
  constructor(container) {
    this.router = Router()
    this.auth = new Auth(container).router
    this.connection = container.get('sql').conn
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
