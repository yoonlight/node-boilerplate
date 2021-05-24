const { Entity, PrimaryGeneratedColumn } = require('typeorm')

@Entity()
class Base {
  @PrimaryGeneratedColumn()
  id = undefined
}

module.exports = {
  Base,
}
