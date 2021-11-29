import pkg from "mariadb"
const mariadb = pkg
import { createUser } from "./users"

const pool = mariadb.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 5,
})

const admin = {
  userid: process.env.ROOT_USERID || "admin",
  username: process.env.ROOT_USERNAME || "admin",
  password: process.env.ROOT_PASSWORD || "abc",
}

export const queryDB = async (query: string, values?: any) => {
  let conn
  try {
    conn = await pool.getConnection()
    return conn.query(query, values)
  } catch (err) {
    throw err
  } finally {
    if (conn) conn.release()
  }
}

export const initDB = async () => {
  //create tables if not exist
  const userPromise = queryDB(
    "CREATE TABLE IF NOT EXISTS users(userid varchar(11) not null primary key,username varchar(21) not null, password varchar(60) not null);"
  )

  const downloadPromise = queryDB(
    "CREATE TABLE IF NOT EXISTS downloads(youtubeid varchar(13) not null primary key,title varchar(50) not null, status int(3) not null);"
  )

  //create admin
  await userPromise
  const users = await queryDB("SELECT userid FROM users")
  if (users.length == 0) {
    await createUser(admin.userid, admin.username, admin.password)
  }

  await downloadPromise
}
