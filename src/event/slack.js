const { WebClient } = require('@slack/web-api');
const { config } = require('lib');
class Slack {
  token = config.SLACK_TOKEN;
  convoId = config.SLACK_CONVERSATION_ID;
  constructor() {
    this.web = new WebClient(this.token);
  }

  async sendMessage(msg) {
    try {
      const res = await this.web.chat.postMessage({
        channel: this.convoId,
        blocks: [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: 'Todo List update',
              emoji: true,
            },
          },
        ],
        attachments: [
          {
            text: msg,
          },
        ],
      });
      // `res` contains information about the posted message
      console.log('Message sent: ', res.ts);
    } catch (error) {
      console.log(error.data);
    }
  }
}

const slack = new Slack()

module.exports = {
  slack
};
