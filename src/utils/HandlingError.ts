import { Request, Response } from "express"
import { ErrorApp, ResponseWithoutData } from "./Response.Mapper"
import { MESSAGES } from "./Messages"
import { MESSAGE_CODE } from "./MessageCode"
import multer from "multer"

export const HandlingError = (err: ErrorApp | Error, req: Request, res: Response) => {
  if (err instanceof multer.MulterError) { // Multer Error Handler
    if (err.code === 'LIMIT_FILE_SIZE') {
      return ResponseWithoutData(res, 400, MESSAGE_CODE.BAD_REQUEST, MESSAGES.ERROR.INVALID.IMAGE_SIZE)
    }
  }
  if (err instanceof ErrorApp) {
      return ResponseWithoutData(res, err.statusCode, err.code, err.message)
  }
  return ResponseWithoutData(res, 500, MESSAGE_CODE.INTERNAL_SERVER_ERROR, MESSAGES.ERROR.SERVER_ERROR.INTERNAL_SERVER_ERROR)
}