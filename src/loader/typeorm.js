const { createConnection } = require('typeorm')
const { SnakeNamingStrategy } = require('typeorm-naming-strategies')
class TypeOrm {
  conn
  title = 'hello world!'
  constructor() {
    this.check()
  }
  check(value) {
    if (value != null) {
      this.title = value

    }
    console.log(this.title);
  }
  async connection() {
    this.conn = await createConnection({
      type: 'mysql',
      host: process.env.MYSQL_URL,
      port: process.env.MYSQL_PORT,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_NAME,
      // synchronize: true,
      logging: true,
      namingStrategy: new SnakeNamingStrategy(),
      entities: ['src/entity/*.js'],
    })
  }

}

class Singleton {
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = new TypeOrm();
    }
  }
  getInstance() {
    return Singleton.instance;
  }
}

module.exports = {
  Singleton,
}
