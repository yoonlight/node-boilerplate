const axios = require('axios').default

const client_id = process.env.ClientID
const client_secret = process.env.ClientSecret
const api_url = 'https://openapi.naver.com/v1/search/news.json?query='
const options = {
  headers: {
    'X-Naver-Client-Id': client_id,
    'X-Naver-Client-Secret': client_secret,
  },
}

const instance = axios.create(options)

async function search(query) {
  const url = api_url + encodeURI(query)
  const result = (await instance.get(url)).data
  return result
}

module.exports = search
