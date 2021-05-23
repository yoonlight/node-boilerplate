const { mq } = require('./mq')
const { app } = require('./express');
const { Singleton } = require('./typeorm');
class Start {
  sql
  isConnected = false
  constructor() {
    app.listen()
    this.sql = new Singleton().getInstance()
  }

  async connection() {
    try {

      const value = await this.sql.connection()
      console.log(value);
      this.isConnected = value
    } catch (error) {
      console.log(error);
    }
  }
}

const start = new Start
module.exports = {
  start
};
