const { WebClient, ChatPostMessageArguments } = require('@slack/web-api');
const { config } = require('lib');
const { block } = require('skill');
class Slack {
  constructor() {
    this.token = config.SLACK_TOKEN;
    this.convoId = config.SLACK_CONVERSATION_ID;
    this.web = new WebClient(this.token);
  }
  /**
   * @param {object} msg
   * @param {string} msg.title 
   * @param {string} msg.text 
   */
  async sendMessage(msg) {
    /**
     * @type {ChatPostMessageArguments}
     */
    let arg = {}
    arg.channel = this.convoId
    block[0].text.text = msg.title
    arg.blocks = block
    arg.attachments = [{ text: msg.text }]
    try {
      const res = await this.web.chat.postMessage(arg);
      console.log('Message sent: ', res.ts);
    } catch (error) {
      console.log(error);
    }
  }
}

const slack = new Slack()

module.exports = {
  slack
};
