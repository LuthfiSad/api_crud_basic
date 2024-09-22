import { NextFunction, Request, Response } from "express";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp, ResponseWithData } from "../../utils/Response.Mapper";
import { getUserService } from "./userService";
import { MESSAGE_CODE } from "utils/MessageCode";

export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { search, role, page, perPage } = req.query;

  const user = await getUserService({
    search: search as string,
    page: page ? Number(page) : undefined,
    perPage: perPage ? Number(perPage) : undefined,
    role: role as string,
    // openAbsen: openAbsen as string,
    // openRegister: openRegister as string
  });

  if (user instanceof ErrorApp) {
    next(user);
    return;
  }

  ResponseWithData(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.USER_DATA.GET,
    user.data,
    user.meta
  );
};
