const express = require('express');
const router = require('./router')
const mqLoad = require('./loader/mq')

const app = express();
app.use('/api', router)
app.listen(process.env.PORT, () => {
  console.log('naver search app listening on port', process.env.PORT);
});

mqLoad()
