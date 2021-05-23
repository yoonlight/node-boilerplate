const { mq } = require('./mq')
const { app } = require('./express');
const { Singleton } = require('./typeorm');
class Start {
  sql
  constructor() {
    app.listen()
    this.sql = new Singleton()
  }
}

const start = new Start
module.exports = {
  start
};
