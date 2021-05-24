const { PrimaryGeneratedColumn } = require('typeorm')

class Base {
  @PrimaryGeneratedColumn()
  id = undefined
}

module.exports = {
  Base,
}
