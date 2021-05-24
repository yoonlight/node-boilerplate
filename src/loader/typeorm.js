const { createConnection } = require('typeorm')
const { SnakeNamingStrategy } = require('typeorm-naming-strategies')
class TypeOrm {
  conn
  title = 'hello world!'
  constructor() {
    if (!TypeOrm.instance) {
      this._cache = []
      TypeOrm.instance = this;
    }

    return TypeOrm.instance
  }

  setData(a) {
    this._cache.push(a)
  }

  getData() {
    return this._cache
  }

  getConnection() {
    return this.conn
  }

  async connection() {
    this.conn = await createConnection({
      type: process.env.DB_TYPE,
      host: process.env.MYSQL_URL,
      port: process.env.MYSQL_PORT,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_NAME,
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
  TypeOrm,
  Singleton,
}
