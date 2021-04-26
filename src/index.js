const express = require('express');
const router = require('./router')
const loader = require('./loader')

const app = express();
app.use('/api', router)
app.listen(process.env.PORT, () => {
  console.log('naver search app listening on port', process.env.PORT);
});

loader()
