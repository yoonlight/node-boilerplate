const { Entity, Column } = require('typeorm')
const { Base } = require('./base');
@Entity()
class User extends Base {
  @Column('varchar')
  username = ''

  @Column('varchar')
  email = ''

  @Column('varchar')
  password = ''

  @Column('varchar')
  role = ''

  @Column({type: 'boolean', default: false})
  isActivate = false
}

module.exports = {
  User,
}