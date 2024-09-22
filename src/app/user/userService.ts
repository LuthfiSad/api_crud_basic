

import { MESSAGE_CODE } from "utils/MessageCode"
import { MESSAGES } from "../../utils/Messages"
import { ErrorApp, Meta } from "../../utils/Response.Mapper"
import { userMapper } from "./userMapper"
import { getUser, getUserCount } from "./userRepository"
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