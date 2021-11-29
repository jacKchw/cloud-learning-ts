import passport from "passport"
import { Strategy, ExtractJwt } from "passport-jwt"

var opts = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: process.env.SECRET || "abc",
}

export const usePassport = () => {
  passport.use(
    new Strategy(opts, function (jwt_payload, done) {
      try {
        if (
          jwt_payload.address &&
          jwt_payload.email &&
          jwt_payload.userid &&
          jwt_payload.isPremium !== undefined &&
          jwt_payload.roleType !== undefined
        ) {
          return done(null, jwt_payload)
        }
        return done(null, false)
      } catch (error) {
        return done(error, false)
      }
    })
  )
}
