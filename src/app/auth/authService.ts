import * as bcrypt from "bcrypt";
import { MESSAGE_CODE } from "../../utils/MessageCode";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp } from "../../utils/Response.Mapper";
import { createUser, getUserByEmail, getUserById } from "../user/userRepository";
import { LoginAuthBodyDTO, RegisterAuthBodyDTO } from "./authTypes";
import { registerValidate } from "./authValidate";
import jwt, { decode } from "jsonwebtoken";
import { TokenDecodeInterface } from "../../middleware/tokenTypes";
import { environment } from "../../config/dotenvConfig";
import { ImageUploadBodyDTO, uploadImage } from "../../config/multerConfig";

export const registerService = async ({
  name,
  email,
  password,
  role,
  image,
  linkImage,
  pathImage
}: ImageUploadBodyDTO & RegisterAuthBodyDTO ) => {
  const user = await getUserByEmail(email as string);
  if (user) {
    return new ErrorApp(
      MESSAGES.ERROR.ALREADY.USER,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const validate = await registerValidate({ name, email, password, role });
  if (validate instanceof ErrorApp) {
    return new ErrorApp(validate.message, validate.statusCode, validate.code);
  }
  const hashPassword = await bcrypt.hash(password as string, 10);
  uploadImage(image, pathImage, "users");

  const response = await createUser({
    name,
    email,
    password: hashPassword,
    role,
    image: linkImage
  });
  return response;
};

export const loginService = async (body: LoginAuthBodyDTO) => {

  if (
    typeof body.email !== 'string' ||
    typeof body.password !== 'string') {
      return new ErrorApp(MESSAGES.ERROR.INVALID.BODY, 400, MESSAGE_CODE.BAD_REQUEST);
    }
  
  const user = await getUserByEmail(body.email);
  if (!user) {
    return new ErrorApp(MESSAGES.ERROR.INVALID.LOGIN, 400, MESSAGE_CODE.BAD_REQUEST);
  }
  const match = await bcrypt.compare(body.password, user.password);
  if (!match) {
    return new ErrorApp(MESSAGES.ERROR.INVALID.LOGIN, 400, MESSAGE_CODE.BAD_REQUEST);
  }
  const token = jwt.sign({
    id: user.id,
  }, environment.JWT_SECRET as string, { expiresIn: '3d' })

  // const userInfo = { // Add this if you want to return user info
  //     name: user.name,
  //     nim: user.nim,
  //     role: user.role,
  // }

  return { access_token: token }
}

export const logoutService = async (token: string) => {
  const decodeToken = decode(token) as TokenDecodeInterface
  const id = decodeToken.id
  const response = await getUserById(id)
  if (!response) {
      return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT, 404, MESSAGE_CODE.NOT_FOUND)
  }
  // const fcm = await getUserFCMByUserId(user.id)
  // if (!fcm) {
  //     return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.USER.FCM, 404, MESSAGE_CODE.NOT_FOUND)
  // }
  // const response = await userLogin(user.id, false)
  return response
}