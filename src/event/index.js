const EventEmitter = require('events')
const { send } = require('./mq')
const myEmitter = new EventEmitter()
const { sendMail } = require('./mail');
const { slack } = require('./slack');
myEmitter.on('MQ', async (msg) => {
  await send.mq(msg)
})
myEmitter.on('Email', sendMail.eventMail)
myEmitter.on('Slack', async (msg) => {
  await slack.sendMessage(msg)
})

module.exports = myEmitter
