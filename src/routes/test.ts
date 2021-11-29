import { Router } from "express"
import passport from "passport"

import * as controllers from "../controllers/test"

var router = Router()

router.get("/test", controllers.getTest)

router.get(
  "/token",
  passport.authenticate("jwt", { session: false }),
  controllers.getTest
)

export default router
