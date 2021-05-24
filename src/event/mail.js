const nodemailer = require('nodemailer');
const { config } = require('lib');

class SendMail {
  mail
  user = config.EMAIL_ADDR
  pass = config.EMAIL_PWD
  message = {
    // Comma separated list of recipients
    to: this.user,

    // Subject of the message
    subject: 'Nodemailer is unicode friendly ✔',

    // plaintext body
    text: 'Hello to myself!',

    // HTML body
    html:
      '<p><b>Hello</b> to myself <img src="cid:note@example.com"/></p>' +
      '<p>Here\'s a nyan cat for you as an embedded attachment:<br/><img src="cid:nyan@example.com"/></p>',
  }

  constructor() {
    this.register()
  }

  register() {
    this.mail = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: this.user,
        pass: this.pass,
      },
    })
  }
  async eventMail(msg) {
    console.log(msg)
    try {
      const info = await mail.sendMail(message)
      console.log('Email sent: ' + info.response)
      console.log('Delivered message %s', info.messageId)
    } catch (e) {
      console.error(e.message)
    }
  }
}

const sendMail = new SendMail

module.exports = {
  sendMail
};
