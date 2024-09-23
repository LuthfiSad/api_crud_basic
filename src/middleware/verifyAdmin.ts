import { NextFunction, type Response } from "express";
import { TokenExpiredError, decode, verify } from 'jsonwebtoken';
import { MESSAGES } from "../utils/Messages";
import { MESSAGE_CODE } from "../utils/MessageCode";
import { getUserById } from "../app/user/userRepository";
import { ResponseWithoutData } from "../utils/Response.Mapper";
import { environment } from "../config/dotenvConfig";
import { RequestWithUserId, TokenDecodeInterface } from "./tokenTypes";

export const VerifyAdmin = (req: RequestWithUserId, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return ResponseWithoutData(res, 401, MESSAGE_CODE.UNAUTHORIZED, MESSAGES.ERROR.UNAUTHORIZED.FORBIDDEN)
    }
    const token = req.headers.authorization.replace("Bearer ", "")
    verify(token, environment.JWT_SECRET as string, async (err) => {
        if (err) {
            if (err instanceof TokenExpiredError) {

                return ResponseWithoutData(res, 401, MESSAGE_CODE.UNAUTHORIZED, MESSAGES.ERROR.UNAUTHORIZED.EXPIRED)
            }
            const decodeToken = decode(token)
            if (!(decodeToken as TokenDecodeInterface)?.id) {
                return ResponseWithoutData(res, 401, MESSAGE_CODE.UNAUTHORIZED, MESSAGES.ERROR.UNAUTHORIZED.RECOGNIZED)
            }
            if ((decodeToken as TokenDecodeInterface)?.id) {
                const { id } = decodeToken as TokenDecodeInterface
                const getUser = await getUserById(id)

                if (!getUser) {
                    return ResponseWithoutData(res, 401, MESSAGE_CODE.NOT_FOUND, MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT)
                }

                if (getUser.role !== "ADMIN") {
                    return ResponseWithoutData(res, 401, MESSAGE_CODE.UNAUTHORIZED, MESSAGES.ERROR.INVALID.ROLE_ADMIN)
                }

            }
            return ResponseWithoutData(res, 401, MESSAGE_CODE.UNAUTHORIZED, MESSAGES.ERROR.INVALID.AUTH)
        }
        const decoded = decode(token) as TokenDecodeInterface;
        req.userId = decoded?.id;
        next()
    })


}