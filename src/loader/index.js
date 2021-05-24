//@ts-check
const { useContainer } = require('typeorm');
const { Container } = require('typedi');
const { MQ } = require('./mq')
const { App } = require('./express');
const { TypeOrm } = require('./typeorm');
const { Passport } = require('./passport');
const { Controller } = require('controller');
const { Model } = require('entity');
const { Routes } = require('router');
class Start {
  constructor() {
    this.LoadModule()
  }

  async LoadModule() {
    try {
      Container.set({ id: 'sql', value: new TypeOrm })
      this.hello = Container.get('sql')
      await this.hello.connection()
      Container.set({ id: 'authController', value: new Controller(Container, Model.User) })
      Container.set({ id: 'router', value: new Routes(Container) })
      Container.set({ id: 'web', value: new App(Container) })
      Container.set({ id: 'mq', value: new MQ })
      Container.set({ id: 'Auth', value: new Passport(Container) })
      this.app = Container.get('web')
      this.mq = Container.get('mq')
      await this.mq.mqLoad()
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