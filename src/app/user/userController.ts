import { NextFunction, Request, Response } from "express";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp, HandleResponseApi } from "../../utils/Response.Mapper";
import { deleteUserService, getUserByIdService, getUserService, updateUserService } from "./userService";
import { MESSAGE_CODE } from "../../utils/MessageCode";

export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { search, page, perPage } = req.query;

  const user = await getUserService({
    search: search as string,
    page: page ? Number(page) : undefined,
    perPage: perPage ? Number(perPage) : undefined,
    // openAbsen: openAbsen as string,
    // openRegister: openRegister as string
  });

  if (user instanceof ErrorApp) {
    next(user);
    return;
  }

  HandleResponseApi(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.USER_DATA.GET, user.data, user.meta);
};

export const getUserByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const user = await getUserByIdService(id);

  if (user instanceof ErrorApp) {
    next(user);
    return;
  }

  HandleResponseApi(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.USER_DATA.GET, user);
};

export const getProfileByIdTokenController = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  const user = await getUserByIdService(userId as string);
  if (user instanceof ErrorApp) {
    next(user);
    return;
  }

  HandleResponseApi(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.USER_DATA.GET,
    user
  );
}

// export const getImageController = async (req: Request, res: Response, next: NextFunction) => {
//   const { path } = req.params;

//   const fullPath = getPathImage(path, 'users');

//     // Mengirimkan file gambar
//     res.sendFile(fullPath, (err) => {
//       if (err) { 
//         next(new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ROUTE, 404, MESSAGE_CODE.NOT_FOUND))
//       }
//     });
// }

export const updateUserController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const user = await updateUserService({...req.body, id, image: req.file?.path});

  if (user instanceof ErrorApp) {
    next(user);
    return;
  }

  HandleResponseApi(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.USER.UPDATE, user);
}

export const deleteUserController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const user = await deleteUserService(id);
  if (user instanceof ErrorApp) {
    next(user);
  }
  HandleResponseApi(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.USER.DELETE)
}