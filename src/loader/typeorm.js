const { createConnection } = require('typeorm')
const { SnakeNamingStrategy } = require('typeorm-naming-strategies')
const { config } = require('lib');
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
      type: config.DB_TYPE,
      host: config.MYSQL_HOST,
      port: config.MYSQL_PORT,
      username: config.MYSQL_USER,
      password: config.MYSQL_PASS,
      database: config.MYSQL_NAME,
      logging: true,
      namingStrategy: new SnakeNamingStrategy(),
      entities: ['src/entity/*.js'],
    })
  }

}

module.exports = {
  TypeOrm,
}
