import { deleteImage, ImageUploadBodyDTO, uploadImage } from "../../config/multerConfig"
import { MESSAGE_CODE } from "../../utils/MessageCode"
import { MESSAGES } from "../../utils/Messages"
import { REGEX } from "../../utils/Regex"
import { ErrorApp, Meta } from "../../utils/Response.Mapper"
import { RegisterAuthBodyDTO } from "../auth/authTypes"
import { userMapper } from "./userMapper"
import { deleteUser, getUser, getUserByEmail, getUserById, getUserCount, updateUser } from "./userRepository"
import { IFilterUser, UserModelTypes } from "./userTypes"

export const getUserService = async ({ search, page = 1, perPage = 10, role = undefined }: IFilterUser) => {

  const [user, totalData] = await Promise.all([
      getUser({ search, page, perPage, role: role?.toLocaleLowerCase() as string }),
      getUserCount({ search, role: role?.toLocaleLowerCase() as string })
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
  role,
  id,
  image,
  linkImage,
  pathImage
}: ImageUploadBodyDTO & RegisterAuthBodyDTO ) => {
  if (!id) {
    return new ErrorApp(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST)
  }
  const user = await getUserById(id)
  if (!user) {
      return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT, 404, MESSAGE_CODE.NOT_FOUND)
  }

  const updateFields: Partial<UserModelTypes> = {};

  if (name) updateFields.name = name;
  if (email) {
    if (!email.match(REGEX.email)) {
      return new ErrorApp(MESSAGES.ERROR.INVALID.GLOBAL.EMAIL, 400, MESSAGE_CODE.BAD_REQUEST)
    }
    const userEmail = await getUserByEmail(email as string);
    if (userEmail && userEmail.id !== id) {
      return new ErrorApp(MESSAGES.ERROR.ALREADY.USER, 400, MESSAGE_CODE.BAD_REQUEST);
    }
    updateFields.email = email;
  }
  if (role) {
    if (!["admin", "anggota"].includes(role)) {
      return new ErrorApp(MESSAGES.ERROR.INVALID.ROLE, 400, MESSAGE_CODE.BAD_REQUEST);
    }
    updateFields.role = role
  };
  if (image) {
    uploadImage(image, pathImage, "users");
    deleteImage(user.image, "users");
    updateFields.image = linkImage;
  }

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
  const image = await deleteImage(user.image, "users")
  if (!image) {
      return new ErrorApp(MESSAGES.ERROR.INVALID.FILE_PATH, 400, MESSAGE_CODE.BAD_REQUEST);
  }
  const response = await deleteUser(id as string)
  return response
}