const {Router} = require('express')
// const myEmitter = require('event')
// const {auth,Auth} = require('./auth');
const { Auth } = require('./auth');

// const router = express.Router()

// router.get('/greet', async (req, res) => {
//   const greet = 'hello wolrd!'
//   myEmitter.emit('MQ', greet)
//   res.json(greet)
// })
// router.use('/auth', auth)

class Routes {
  router
  constructor(container) {
    this.router = Router()
    this.auth = container.get('AuthRouter').router
    this.connection = container.get('sql').conn
    this.router.use('/auth', this.auth)
    this.router.get('/synchronize', async (req, res) => {
      await this.connection.synchronize();
    })
    // this.router.get('/greet', async (req, res) => {
    //   const greet = 'hello wolrd!'
    //   myEmitter.emit('MQ', greet)
    //   res.json(greet)
    // })
  }
}
module.exports = {
  // router,
  Auth,
  Routes
}
