const amqp = require('amqplib')

class MQ {
  q = 'tasks'
  host = process.env.RABBITMQ_URL
  constructor(queue) {
    if (queue != null) {
      this.q = queue
    }
    if (!MQ.instance) {
      this.open = amqp.connect(this.host)
      MQ.instance = this;
    }
    return MQ.instance
  }
  async mqLoad() {
    try {
      const conn = await this.open
      const ch = await conn.createChannel()
      let ok = ch.assertQueue(this.q)
      ok = ok.then(() => {
        return ch.consume(this.q, function (msg) {
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

module.exports = {
  MQ
};
