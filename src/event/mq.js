const amqp = require('amqplib')

const open = amqp.connect(process.env.MQ_URL)

async function mq(body) {
  const q = 'tasks'
  try {
    const conn = await open
    const ch = await conn.createChannel()
    let ok = ch.assertQueue(q)
    ok = ok.then(() => {
      return ch.sendToQueue(q, Buffer.from(body))
    })
  } catch (error) {
    console.warn(error)
  }
}

module.exports = mq
