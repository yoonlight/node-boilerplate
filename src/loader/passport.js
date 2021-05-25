const passportJWT = require('passport-jwt')
const passport = require('passport')
const { Model } = require('../entity')
const LocalStrategy = require('passport-local')
const { Controller } = require('../controller')

class Passport {
  JwtStrategy = passportJWT.Strategy
  ExtractJwt = passportJWT.ExtractJwt
  opts = {
    jwtFromRequest: this.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SERVER_SECRET_KEY
  }
  constructor(container) {

    this.app = container.get('web').app
    this.ctrl = container.get('authController')
    passport.use(
      new this.JwtStrategy(this.opts, async (jwt_payload, done) => {
        try {
          const user = await this.ctrl.get({ id: jwt_payload.uid })
          if (user) return done(null, user)
          else return done(null, false)
        } catch (error) {
          done(error, false)
        }
      })
    )

    passport.use(
      new LocalStrategy(async (username, password, done) => {
        try {
          const user = await this.ctrl.get({ username: username })
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' })
          }
          if (user.password != password) {
            return done(null, false, { message: 'Incorrect password.' })
          }
          return done(null, user)
        } catch (error) {
          done(error)
        }
      })
    )

    passport.serializeUser(function (user, done) {
      done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
      try {
        const user = await this.ctrl.get({ id: id })
        return done(null, user)
      } catch (error) {
        done(error)
      }
    })
    this.app.use(passport.initialize())
    this.app.use(passport.session())
    console.log('Complete Authorization Register')
  }
}

module.exports = {
  Passport,
}
