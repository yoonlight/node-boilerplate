const { start, TypeOrm } = require('./loader')

start
const connection = start.sql
connection.setData('world!')
console.log(connection.getData());

const hello = new TypeOrm
console.log(hello.getData());

async function name() {
  await start.connection()
  console.log(`2 ${hello.conn.isConnected}`);
}

name()
// console.log(`1 ${start.sql.isConnected}`);
