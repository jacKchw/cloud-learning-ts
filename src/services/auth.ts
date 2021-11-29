import passport from "passport"
import { Strategy, ExtractJwt } from "passport-jwt"

var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET || "abc",
}

export const usePassport = () => {
  passport.use(
    new Strategy(opts, function (jwt_payload, done) {
      try {
        if (jwt_payload.userid && jwt_payload.username) {
          return done(null, jwt_payload)
        }
        return done(null, false)
      } catch (error) {
        return done(error, false)
      }
    })
  )
}
