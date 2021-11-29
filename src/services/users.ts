import { queryDB } from "../services/db"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import config from "../config.json"
import createHttpError from "http-errors"

export const isUnique = async (userid: string) => {
  const query = "SELECT * FROM users WHERE userid=?"
  const results = await queryDB(query, [userid])
  return results.length === 0
}

export const getUsers = async (userid?: string) => {
  if (userid) {
    const query = "SELECT * FROM users WHERE userid=?"
    return queryDB(query, [userid])
  }
  return queryDB(`SELECT * FROM users`)
}

export const createUser = async (
  userid: string,
  username: string,
  password: string
) => {
  const crypted = await bcrypt.hash(password, config.passwordSaltRounds)
  const query = "INSERT INTO users (userid, username, password) VALUES (?,?,?)"
  return queryDB(query, [userid, username, crypted])
}

interface User {
  userid: string
  username: string
  password: string
}

export const createJWT = async (user: User, reqPassword: string) => {
  // verify password
  const compareResult = await bcrypt.compare(reqPassword, user.password)
  if (!compareResult) {
    throw new createHttpError.Unauthorized("invalid userid or password")
  }

  //create JWT
  const jwtPayload = { userid: user.userid, username: user.username }
  const secretOrKey = process.env.SECRET || "abc"
  const token = jwt.sign(jwtPayload, secretOrKey, {
    expiresIn: config.JWTexpiresIn,
  })
  return token
}

export const deleteUser = async (userid: string) => {
  const query = "DELETE FROM users WHERE userid=?"
  return queryDB(query, [userid])
}
