import { Router } from "express"
import passport from "passport"

import * as controllers from "../controllers/users"

var router = Router()

router.get(
  "/",
  //   passport.authenticate("jwt", { session: false }),
  controllers.getUsers
)

router.get("/unique/:userid", controllers.getUniqueUser)

router.post(
  "/signup",
  passport.authenticate("jwt", { session: false }),
  controllers.signup
)

router.post("/login", controllers.login)

router.delete(
  "/:userid",
  passport.authenticate("jwt", { session: false }),
  controllers.deleteUser
)

export default router
