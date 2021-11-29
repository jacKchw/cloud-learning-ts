import createHttpError from "http-errors"
import { errWrapper } from "./errorHandler"
import * as services from "../services/users"

const ER_REQUIRE_USERID = new createHttpError.BadRequest("missing userid")
const ER_REQUIRE_USERNAME = new createHttpError.BadRequest("missing username")
const ER_REQUIRE_PASSWORD = new createHttpError.BadRequest("missing password")

export const getUsers = errWrapper(async (req, res, next) => {
  const result = await services.getUsers()
  res.json({ data: result })
})

export const getUniqueUser = errWrapper(async (req, res, next) => {
  const userid = req.params.userid
  if (!userid) {
    throw ER_REQUIRE_USERID
  }
  const unique = await services.isUnique(userid)
  res.json({ data: unique })
})

export const signup = errWrapper(async (req, res, next) => {
  const body = req.body
  if (!body.userid) {
    throw ER_REQUIRE_USERID
  }
  if (!body.username) {
    throw ER_REQUIRE_USERNAME
  }
  if (!body.password) {
    throw ER_REQUIRE_PASSWORD
  }
  //check if user exist
  const unique = await services.isUnique(body.userid)
  if (!unique) {
    throw new createHttpError.BadRequest("duplicate userid")
  }

  await services.createUser(body.userid, body.username, body.password)
  res.json({ data: { userid: body.userid, username: body.username } })
})

export const login = errWrapper(async (req, res, next) => {
  const body = req.body

  if (!body.userid) {
    throw ER_REQUIRE_USERID
  }
  if (!body.password) {
    throw ER_REQUIRE_PASSWORD
  }

  const users = await services.getUsers(body.userid)
  if (users.length == 0) {
    throw new createHttpError.Unauthorized("invalid userid or password")
  }

  const token = await services.createJWT(users[0], body.password)
  res.json({ data: token })
})

export const deleteUser = errWrapper(async (req, res, next) => {
  const userid = req.params.userid
  if (!userid) {
    throw ER_REQUIRE_USERID
  }

  const results = await services.deleteUser(userid)
  if (results.affectedRows === 0) {
    throw new createHttpError.BadRequest("no user found")
  }
  res.json({ data: userid })
})
