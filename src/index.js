const { start } = require('./loader')

start
const connection = start.sql
connection.check('world!')
connection.check()

async function name() {
  await start.connection()
  console.log(`2 ${start.isConnected}`);
}

name()
console.log(`1 ${start.isConnected}`);
