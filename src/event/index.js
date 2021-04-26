const EventEmitter = require('events')
const mq = require('./mq');
const myEmitter = new EventEmitter();

myEmitter.on('MQ', mq);

module.exports = myEmitter
