import { NextFunction, type Response } from "express";
import { TokenExpiredError, decode, verify } from 'jsonwebtoken';
import { MESSAGES } from "../utils/Messages";
import { MESSAGE_CODE } from "../utils/MessageCode";
import { environment } from "../config/dotenvConfig";
import { HandleResponseApi } from "../utils/Response.Mapper";
import { RequestWithUserId, TokenDecodeInterface } from "./tokenTypes";
import { getUserById } from "../app/user/userRepository";

export const VerifyToken = (req: RequestWithUserId, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return HandleResponseApi(res, 401, MESSAGE_CODE.UNAUTHORIZED, MESSAGES.ERROR.UNAUTHORIZED.FORBIDDEN)
    }
    const token = req.headers.authorization.replace("Bearer ", "")
    verify(token, environment.JWT_SECRET as string, async (err) => {
        if (err) {
            if (err instanceof TokenExpiredError) {

                return HandleResponseApi(res, 401, MESSAGE_CODE.UNAUTHORIZED, MESSAGES.ERROR.UNAUTHORIZED.EXPIRED)
            }
            return HandleResponseApi(res, 401, MESSAGE_CODE.UNAUTHORIZED, MESSAGES.ERROR.INVALID.AUTH)
        }
        const decoded = decode(token) as TokenDecodeInterface;
        if (!(decoded as TokenDecodeInterface)?.id) {
            return HandleResponseApi(res, 401, MESSAGE_CODE.UNAUTHORIZED, MESSAGES.ERROR.UNAUTHORIZED.RECOGNIZED)
        }
        const user = await getUserById(decoded.id)
        if (!user) {
            return HandleResponseApi(res, 401, MESSAGE_CODE.UNAUTHORIZED, MESSAGES.ERROR.UNAUTHORIZED.RECOGNIZED)
        }
        req.userId = decoded?.id;
        next()
    })


}