const amqp = require('amqplib')

async function mqLoad() {
  const q = 'tasks'
  const open = amqp.connect(process.env.MQ_URL)

  try {
    const conn = await open
    const ch = await conn.createChannel()
    let ok = ch.assertQueue(q)
    ok = ok.then(() => {
      return ch.consume(q, function (msg) {
        if (msg !== null) {
          console.log(' [x] %s', msg.content.toString())
          ch.ack(msg)
        }
      })
    })
    return ok.then(() => {
      console.log(' [*] Waiting for logs. To exit press CTRL+C')
    })
  } catch (error) {
    console.warn(error)
  }
}

module.exports = mqLoad
