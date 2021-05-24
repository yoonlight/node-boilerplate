//@ts-check
const { MQ } = require('./mq')
const { App } = require('./express');
const { Singleton, TypeOrm } = require('./typeorm');
const { Controller } = require('controller');
const { Model } = require('entity');
const { Routes, Auth } = require('router');
const { useContainer } = require('typeorm');
var Container = require('typedi').Container;
class Start {
  sql
  app
  mq
  hello
  constructor() {
    this.sql = new Singleton().getInstance()
  }

  async load() {
    await this.mq.mqLoad()
  }
  async connection() {
    try {
      await this.sql.connection()
      useContainer(Container);
      Container.set({ id: 'sql', value: new TypeOrm })
      Container.set({ id: 'authController', value: new Controller(Container, Model.User) })
      Container.set({ id: 'AuthRouter', value: new Auth(Container) })
      Container.set({ id: 'router', value: new Routes(Container) })
      Container.set({ id: 'web', value: new App(Container) })
      Container.set({ id: 'mq', value: new MQ })
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