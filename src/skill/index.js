const { ChatPostMessageArguments } = require('@slack/web-api');
/**
 * @type {ChatPostMessageArguments}
 */
let message = {}
let block = message.blocks
block = [
  {
    type: 'header',
    text: {
      type: 'plain_text',
      text: 'Todo List update',
      emoji: true,
    },
  }
]

module.exports = {
  block
};
