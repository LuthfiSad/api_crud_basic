import { MESSAGE_CODE } from "../../utils/MessageCode"
import { MESSAGES } from "../../utils/Messages"
import { ErrorApp, Meta } from "../../utils/Response.Mapper"
import { RegisterAuthBodyDTO } from "../auth/authTypes"
import { userMapper } from "./userMapper"
import { deleteUser, getUser, getUserById, getUserCount, updateUser } from "./userRepository"
import { IFilterUser, UserModelTypes } from "./userTypes"
import { updateUserValidate } from "./userValidate"

export const getUserService = async ({ search, page = 1, perPage = 10 }: IFilterUser) => {

  const [user, totalData] = await Promise.all([
      getUser({ search, page, perPage }),
      getUserCount({ search })
  ])

  const data = await userMapper(user as unknown as UserModelTypes[])
  if (!data.length) {
      return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT, 404, MESSAGE_CODE.NOT_FOUND)
  }
  const response = { data: user, meta: Meta(page, perPage, totalData) }
  return response
}

export const getUserByIdService = async (id: string) => {
  if (!id) {
      return new ErrorApp(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST)
  }
  const user = await getUserById(id)
  if (!user) {
      return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT, 404, MESSAGE_CODE.NOT_FOUND)
  }
  return user
}

export const updateUserService =  async ({
  name,
  email,
  id,
  image,
}: RegisterAuthBodyDTO ) => {
  if (!id) {
    return new ErrorApp(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST)
  }
  const user = await getUserById(id)
  if (!user) {
      return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT, 404, MESSAGE_CODE.NOT_FOUND)
  }

  const validate = await updateUserValidate({ email, id, image })
  if (validate instanceof ErrorApp) {
    return new ErrorApp(validate.message, validate.statusCode, validate.code)
  }

  const updateFields: Partial<UserModelTypes> = {};

  if (name) updateFields.name = name;
  if (email) updateFields.email = email;
  if (image) updateFields.image = image;

  const response = await updateUser(id, updateFields);
  return response
}

export const deleteUserService = async (id: string) => {
  if (!id) {
      return new ErrorApp(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST)
  }
  const user = await getUserById(id)
  if (!user) {
      return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT, 404, MESSAGE_CODE.NOT_FOUND)
  }
  // const image = await deleteImage(user.image, "users")
  // if (!image) {
  //     return new ErrorApp(MESSAGES.ERROR.INVALID.FILE_PATH, 400, MESSAGE_CODE.BAD_REQUEST);
  // }
  const response = await deleteUser(id as string)
  return response
}