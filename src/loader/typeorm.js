const { createConnection } = require('typeorm')
const { SnakeNamingStrategy } = require('typeorm-naming-strategies')

const typeorm = async () => {
  const conn = await createConnection({
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

  return conn
}

module.exports = {
  typeorm,
}
