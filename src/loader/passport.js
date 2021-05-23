const passportJWT = require('passport-jwt')
const passport = require('passport')
const { Model } = require('../entity')
const LocalStrategy = require('passport-local')
const { Controller } = require('../controller')

const authorization = async (app) => {
  let crtl = new Controller(Model.User)
  const JwtStrategy = passportJWT.Strategy
  const ExtractJwt = passportJWT.ExtractJwt
  let opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  opts.secretOrKey = process.env.SERVER_SECRET_KEY
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await crtl.get({ id: jwt_payload.uid })
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
        const user = await crtl.get({ username: username })
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
      const user = await crtl.get({ id: id })
      return done(null, user)
    } catch (error) {
      done(error)
    }
  })
  app.use(passport.initialize())
  app.use(passport.session())
  console.log('Authorization Register')
}

module.exports = {
  authorization,
}
