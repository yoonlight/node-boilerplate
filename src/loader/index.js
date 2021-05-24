//@ts-check
const { MQ } = require('./mq')
const { App } = require('./express');
const { TypeOrm } = require('./typeorm');
const { Controller } = require('controller');
const { Model } = require('entity');
const { Routes, Auth } = require('router');
const { useContainer } = require('typeorm');
const { Container } = require('typedi');
const { Passport } = require('./passport');
class Start {
  constructor() {
  }

  async load() {
    await this.mq.mqLoad()
  }
  async connection() {
    try {
      Container.set({ id: 'sql', value: new TypeOrm })
      this.hello = Container.get('sql')
      await this.hello.connection()
      Container.set({ id: 'authController', value: new Controller(Container, Model.User) })
      Container.set({ id: 'AuthRouter', value: new Auth(Container) })
      Container.set({ id: 'router', value: new Routes(Container) })
      Container.set({ id: 'web', value: new App(Container) })
      Container.set({ id: 'mq', value: new MQ })
      Container.set({ id: 'Auth', value: new Passport(Container) })
      this.app = Container.get('web')
      this.mq = Container.get('mq')
      this.app.listen()
      useContainer(Container);
    } catch (error) {
      console.log(error);
    }
  }
}

const start = new Start

module.exports = {
  start,
};