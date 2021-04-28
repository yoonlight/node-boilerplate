const morgan = require('morgan')
const methodOverride = require('method-override')
const express = require('express')

const expressLoader = (app) => {
  app.use(methodOverride('X-HTTP-Method-Override'))
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())
  app.use(morgan('dev'))
  console.log('Complete Express Module Register')
}

module.exports = {
  expressLoader,
}
