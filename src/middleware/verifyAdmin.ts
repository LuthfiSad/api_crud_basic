import { NextFunction, type Response } from "express";
import { TokenExpiredError, decode, verify } from 'jsonwebtoken';
import { MESSAGES } from "../utils/Messages";
import { MESSAGE_CODE } from "../utils/MessageCode";
import { getUserById } from "../app/user/userRepository";
import { HandleResponseApi } from "../utils/Response.Mapper";
import { environment } from "../config/dotenvConfig";
import { RequestWithUserId, TokenDecodeInterface } from "./tokenTypes";

export const VerifyAdmin = (req: RequestWithUserId, res: Response, next: NextFunction) => {
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
        if ((decoded as TokenDecodeInterface)?.id) {
            const { id } = decoded as TokenDecodeInterface
            const getUser = await getUserById(id)

            if (!getUser) {
                return HandleResponseApi(res, 401, MESSAGE_CODE.UNAUTHORIZED, MESSAGES.ERROR.UNAUTHORIZED.RECOGNIZED)
            }
            
            if (getUser.role !== "admin") {
                return HandleResponseApi(res, 401, MESSAGE_CODE.UNAUTHORIZED, MESSAGES.ERROR.INVALID.ROLE_ADMIN)
            }
        }
        req.userId = decoded?.id;
        next()
    })


}