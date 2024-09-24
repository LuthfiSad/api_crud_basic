import { MESSAGE_CODE } from "../../utils/MessageCode"
import { MESSAGES } from "../../utils/Messages"
import { REGEX } from "../../utils/Regex"
import { ErrorApp } from "../../utils/Response.Mapper"
import { RegisterAuthBodyDTO } from "./authTypes"


export const registerValidate = async ({ name, email, password, role, image }: RegisterAuthBodyDTO) => {
    if (!name) {
        return new ErrorApp(MESSAGES.ERROR.REQUIRED.NAME, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if (!email) {
        return new ErrorApp(MESSAGES.ERROR.REQUIRED.EMAIL, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if (!email.match(REGEX.email)) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.GLOBAL.EMAIL, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if (!password) {
        return new ErrorApp(MESSAGES.ERROR.REQUIRED.PASSWORD, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if(password.length < 8){
        return new ErrorApp(MESSAGES.ERROR.INVALID.USER.PASSWORD_LENGTH, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if (role && !["admin", "anggota"].includes(role)) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.ROLE, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    if (!image){
        return new ErrorApp(MESSAGES.ERROR.REQUIRED.IMAGE, 400, MESSAGE_CODE.BAD_REQUEST)
    }
}