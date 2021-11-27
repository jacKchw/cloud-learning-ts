import { Router } from "express"
import passport from "passport"

import * as controllers from "./controllers"

var router = Router()

router.get("/test", controllers.getTest)

router.get(
  "/testToken",
  passport.authenticate("jwt", { session: false }),
  controllers.getTest
)

export default router
