const { createConnection, Connection, ConnectionOptions } = require('typeorm')
const { SnakeNamingStrategy } = require('typeorm-naming-strategies')
const { config } = require('lib');
const sqlite3 = require('sqlite3')

class TypeOrm {
  /**
   * @type {Connection}
    */
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
    /**
     * @type {ConnectionOptions}
     */
    var dbConfig = {
      logging: true,
      namingStrategy: new SnakeNamingStrategy(),
      entities: ['src/entity/*.js'],
    }
    if (config.DB_TYPE !== 'mysql') {
      let db = new sqlite3.Database("../mydb.sqlite3", (err) => {
        if (err) {
          console.log('Error when creating the database', err)
        } else {
          console.log('Database created!')
        }
      })
      /**
 * @type {ConnectionOptions}
 */
      let sqlite = {
        type: 'sqlite',
        database: config.SQLITE_PATH,
      }
      Object.assign(dbConfig, sqlite);
    } else {
      /**
 * @type {ConnectionOptions}
 */
      let mariadb = {
        type: config.DB_TYPE,
        host: config.MYSQL_HOST,
        port: config.MYSQL_PORT,
        username: config.MYSQL_USER,
        password: config.MYSQL_PASS,
        database: config.MYSQL_NAME,
      }
      Object.assign(dbConfig, mariadb);
    }
    this.conn = await createConnection(dbConfig)
  }
}

module.exports = {
  TypeOrm,
}
