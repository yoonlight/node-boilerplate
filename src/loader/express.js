const morgan = require('morgan')
const methodOverride = require('method-override')
const express = require('express')
const router = require('router');
class App {
  app = express()
  port = process.env.PORT
  constructor() {
    if (!App.instance) {
      this.middleware()
      App.instance = this;
    }
    return App.instance    
  }

  middleware() {
    this.app.use(methodOverride('X-HTTP-Method-Override'))
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(express.json())
    this.app.use(morgan('dev'))
    console.log('Complete Express Module Register')
    this.app.use('/api', router)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Node App listening on Port:', this.port)
    })
  }
}

// const app = new App;

module.exports = {
  App
  // app,
}
