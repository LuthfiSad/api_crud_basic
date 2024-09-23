import { NextFunction, type Response } from "express";
import { TokenExpiredError, decode, verify } from 'jsonwebtoken';
import { MESSAGES } from "../utils/Messages";
import { MESSAGE_CODE } from "../utils/MessageCode";
import { environment } from "../config/dotenvConfig";
import { ResponseWithoutData } from "../utils/Response.Mapper";
import { RequestWithUserId, TokenDecodeInterface } from "./tokenTypes";

export const VerifyToken = (req: RequestWithUserId, res: Response, next: NextFunction) => {
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
        const decoded = decode(token) as TokenDecodeInterface;
        req.userId = decoded?.id;
        next()
    })


}