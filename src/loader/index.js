const mqLoad = require('./mq');

const loader = async () => {
  await mqLoad()
}

module.exports = loader
