const { MQ } = require('./mq')
const { App } = require('./express');
const { Singleton, TypeOrm } = require('./typeorm');
import { useContainer as typeOrmUseContainer } from 'typeorm';
var Container = require('typedi').Container;
class Start {
  sql
  app
  mq
  hello
  constructor() {
    // app.listen()
    this.sql = new Singleton().getInstance()
  }
  
  async load() {
    await this.mq.mqLoad()
  }
  async connection() {
    try {
      await this.sql.connection()
      typeOrmUseContainer(Container);
      Container.set('web', new App)
      Container.set('mq', new MQ)
      Container.set('sql', new TypeOrm)
      this.app = Container.get('web')
      this.mq = Container.get('mq')
      this.hello = Container.get('sql')
      this.app.listen()
    } catch (error) {
      console.log(error);
    }
  }
}

const start = new Start
module.exports = {
  start,
};
