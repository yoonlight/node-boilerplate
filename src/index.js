const express = require('express')
const router = require('./router')
const loader = require('./loader')
const { expressLoader } = require('./loader/express')

const app = express()
expressLoader(app)
app.use('/api', router)
app.listen(process.env.PORT, () => {
  console.log('Node App listening on Port: ', process.env.PORT)
})

loader()
