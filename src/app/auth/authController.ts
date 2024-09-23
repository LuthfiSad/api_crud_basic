import { NextFunction, Request, Response } from "express";
import { loginService, logoutService, registerService } from "./authService";
import { ErrorApp, ResponseWithData, ResponseWithoutData } from "../../utils/Response.Mapper";
import { MESSAGE_CODE } from "../../utils/MessageCode";
import { MESSAGES } from "../../utils/Messages";
import { LoginAuthResponse } from "./authTypes";
import { getLinkImage } from "../../config/multerConfig";

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [linkImage, pathImage] = getLinkImage(req, "users");  
  
  const register = await registerService({...req.body, image: req.file, linkImage, pathImage});

  if (register instanceof ErrorApp) {
    next(register);
    return;
  }
  ResponseWithoutData(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.USER.ACCOUNT);
};

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  // const { email, password } = req.body
  const { body } = req

  const login = await loginService(body);
  if (login instanceof ErrorApp) {
      next(login)
      return
  }
  res.cookie("access_token", login, { httpOnly: true })
  ResponseWithData<LoginAuthResponse>(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.LOGIN, login as LoginAuthResponse)
}

export const logoutController = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace("Bearer ", "")
  const logout = await logoutService(token as string)

  if (logout instanceof ErrorApp) {
      next(logout)
      return
  }

  ResponseWithoutData(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.LOGOUT)
}