import nodemailer from 'nodemailer'

// const mail = nodemailer.createTransport({
//   service: 'gmail',
//   host: 'smtp.gmail.com',
//   port: 465,
//   auth: {
//     user: process.env.EMAIL_ADDR,
//     pass: process.env.EMAIL_PWD,
//   },
// })

// local smtp connect
const mail = nodemailer.createTransport({
  host: '127.0.0.1',
  port: 25,
  auth: {
    user: process.env.EMAIL_ADDR,
    pass: process.env.EMAIL_PWD,
  },
})

let message = {
  // Comma separated list of recipients
  to: process.env.EMAIL_ADDR,

  // Subject of the message
  subject: 'Nodemailer is unicode friendly ✔',

  // plaintext body
  text: 'Hello to myself!',

  // HTML body
  html:
    '<p><b>Hello</b> to myself <img src="cid:note@example.com"/></p>' +
    '<p>Here\'s a nyan cat for you as an embedded attachment:<br/><img src="cid:nyan@example.com"/></p>',
}

async function eventMail(msg) {
  console.log(msg)
  try {
    const info = await mail.sendMail(message)
    console.log('Email sent: ' + info.response)
    console.log('Delivered message %s', info.messageId)
  } catch (e) {
    console.error(e.message)
  }
}

export default eventMail
