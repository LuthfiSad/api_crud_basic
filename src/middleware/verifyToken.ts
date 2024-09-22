import { NextFunction, type Request, type Response } from "express";
import { TokenExpiredError, decode, verify } from 'jsonwebtoken';
import { MESSAGES } from "../utils/Messages";
import { MESSAGE_CODE } from "../utils/MessageCode";
import { environment } from "../config/dotenvConfig";
import { TokenDecodeInterface } from "../app/auth/userTypes";
import { ResponseWithoutData } from "../utils/Response.Mapper";

export const VerifyToken = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return ResponseWithoutData(res, 401, MESSAGE_CODE.UNAUTHORIZED, MESSAGES.ERROR.UNAUTHORIZED.FORBIDDEN)
    }
    const token = req.headers.authorization.replace("Bearer ", "")
    verify(token, environment.JWT_SECRET as string, (err) => {
        if (err) {
            if (err instanceof TokenExpiredError) {

                return ResponseWithoutData(res, 401, MESSAGE_CODE.UNAUTHORIZED, MESSAGES.ERROR.UNAUTHORIZED.EXPIRED)
            }
            const decodeToken = decode(token)
            if (!(decodeToken as TokenDecodeInterface)?.id) {
                return ResponseWithoutData(res, 401, MESSAGE_CODE.UNAUTHORIZED, MESSAGES.ERROR.UNAUTHORIZED.RECOGNIZED)
            }
            return ResponseWithoutData(res, 401, MESSAGE_CODE.UNAUTHORIZED, MESSAGES.ERROR.INVALID.AUTH)
        }
        next()
    })


}