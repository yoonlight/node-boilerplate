const amqp = require('amqplib')

class MQ {
  q = 'tasks'
  host = process.env.RABBITMQ_URL
  // use singleton pattern 
  constructor(queue) {
    if (queue != null) {
      this.q = queue
    }
    this.open = amqp.connect(this.host)
  }
  async mqLoad() {
    try {
      const conn = await this.open
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
}

const mq = new MQ

module.exports = {
  mq
};
