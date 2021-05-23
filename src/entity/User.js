const { Entity, PrimaryGeneratedColumn, Column } = require('typeorm')

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id = undefined

  @Column('varchar')
  username = ''

  @Column('varchar')
  email = ''

  @Column('varchar')
  password = ''

  @Column('varchar')
  role = ''
}

module.exports = {
  User,
}
