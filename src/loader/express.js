const morgan = require('morgan')
const methodOverride = require('method-override')
const express = require('express')
class App {
  app = express()
  port = process.env.PORT
  constructor(container) {
    if (!App.instance) {
      this.router = container.get('router').router
      this.middleware()
      App.instance = this;
    }
    return App.instance
  }
  
  middleware() {
    this.app.use(methodOverride('X-HTTP-Method-Override'))
    this.app.use(express.urlencoded({
      extended: false
    }))
    this.app.use(express.json())
    this.app.use(morgan('dev'))
    console.log('Complete Express Module Register')
  }
  // passport initialize 후에 등록되어야 함!
  registerRouter() {
    this.app.use('/api', this.router)
    console.log('Complete Express Router Register')
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Node App listening on Port:', this.port)
    })
  }
}

module.exports = {
  App
}
