import { Request, Response, NextFunction } from "express"

type RouterFunction<Type> = (
  req: Request,
  res: Response,
  next?: NextFunction
) => Promise<Type>

//wrapper for error handling
export const errWrapper = (callback: RouterFunction<void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    callback(req, res, next).catch(next)
  }
}
