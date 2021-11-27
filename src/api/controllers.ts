import { Request, Response, NextFunction, RequestHandler } from "express"
import createHttpError from "http-errors"

type RouterFunction<Type> = (
  req: Request,
  res: Response,
  next?: NextFunction
) => Promise<Type>

//wrapper for error handling
const errWrapper = (callback: RouterFunction<void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    callback(req, res, next).catch(next)
  }
}

export const getTest = errWrapper(
  async (req: Request, res: Response): Promise<void> => {
    res.json("this server is working")
  }
)
