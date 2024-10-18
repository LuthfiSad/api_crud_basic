import { NextFunction, Request, Response } from "express"
import { ErrorApp, HandleResponseApi } from "./Response.Mapper"
import { MESSAGES } from "./Messages"
import { MESSAGE_CODE } from "./MessageCode"
import multer from "multer"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const HandlingError = (err: ErrorApp | Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  
  if (err instanceof multer.MulterError) { // Multer Error Handler
    if (err.code === 'LIMIT_FILE_SIZE') {
      return HandleResponseApi(res, 400, MESSAGE_CODE.BAD_REQUEST, MESSAGES.ERROR.INVALID.IMAGE_SIZE)
    }
  }
  if (err instanceof ErrorApp) {
      return HandleResponseApi(res, err.statusCode, err.code, err.message)
  }
  return HandleResponseApi(res, 500, MESSAGE_CODE.INTERNAL_SERVER_ERROR, MESSAGES.ERROR.SERVER_ERROR.INTERNAL_SERVER_ERROR)
}