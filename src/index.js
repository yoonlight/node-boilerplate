const { start } = require('./loader')

start

async function name() {
  try {
    await start.connection()
    await start.load()
    const hello = start.hello
    console.log(`2 ${hello.conn.isConnected}`);
    console.log(hello.getData());
  } catch (e) {
    console.error(e)
  }
}

name()
