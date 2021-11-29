import express from "express"
import logger from "morgan"
import passport from "passport"
import createError from "http-errors"

import { usePassport } from "./services/auth"
import testRoutes from "./routes/test"
import userRoutes from "./routes/users"
import { initDB } from "./services/db"

initDB()

var app = express()

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(passport.initialize())
usePassport()

app.use("/", testRoutes)
app.use("/users", userRoutes)

// catch 404 and forward to error handler
app.use(function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  next(createError(404))
})

// error handler
app.use(function (
  err: createError.HttpError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.json({ error: err.message })
})

export default app
