const EventEmitter = require('events')
const { send } = require('./mq')
const myEmitter = new EventEmitter()
import sendMail from './mail';

myEmitter.on('MQ', send.mq)
myEmitter.on('Email', sendMail.eventMail)

module.exports = myEmitter
