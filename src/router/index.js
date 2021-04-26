const express = require('express')
const myEmitter = require('../event/mq')

const router = express.Router()
// const client_id = process.env.ClientID
// const client_secret = process.env.ClientSecret
// const api_url = 'https://openapi.naver.com/v1/search/news.json?query='
// const options = {
//   url: '',
//   headers: {
//     'X-Naver-Client-Id': client_id,
//     'X-Naver-Client-Secret': client_secret
//   }
// };

router.get('/search/news', async (req, res) => {
  myEmitter.emit('MQ', req.body);
  res.json('hello wolrd!')

  // const api_request = api_url + encodeURI(req.query.query);
  // options.url = api_request

  // request.get(options, (error, response, body) => {
  //   if (!error && response.statusCode == 200) {
  //     res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
  //     res.end(body);
  //   } else {
  //     res.status(response.statusCode).end();
  //     console.log('error = ' + response.statusCode);
  //   }
  // });
});

module.exports = router
