const {
  start,
  TypeOrm
} = require('./loader')

start
const connection = start.sql
connection.setData('world!')
console.log(connection.getData());


async function name() {
  await start.connection()
  await start.load()
  const hello = start.hello
  console.log(`2 ${hello.conn.isConnected}`);
  console.log(hello.getData());
}

name()
