import { errWrapper } from "./errorHandler"
import { Request, Response } from "express"

export const getTest = errWrapper(
  async (req: Request, res: Response): Promise<void> => {
    res.json("this server is working")
  }
)
