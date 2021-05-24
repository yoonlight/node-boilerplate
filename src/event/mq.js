const amqp = require('amqplib')

class SendMQ {
  host = process.env.RABBITMQ_URL
  open = amqp.connect(this.host)
  q = 'tasks'
  constructor(queue) {
    if (queue != null) {
      this.q = queue
    }
  }

  async mq(body) {
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
}
const send = new SendMQ
module.exports = {
  send
};
