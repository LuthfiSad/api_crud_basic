import { MESSAGE_CODE } from "../../utils/MessageCode";
import { MESSAGES } from "../../utils/Messages";
import { REGEX } from "../../utils/Regex";
import { ErrorApp } from "../../utils/Response.Mapper";
import { RegisterAuthBodyDTO } from "../auth/authTypes";
import { getUserByEmail } from "./userRepository";
  
export const updateUserValidate = async ({ email, id, image }: RegisterAuthBodyDTO) => {
    if (email) {
        if (!email.match(REGEX.email)) {
            return new ErrorApp(MESSAGES.ERROR.INVALID.GLOBAL.EMAIL, 400, MESSAGE_CODE.BAD_REQUEST)
        }
        const userEmail = await getUserByEmail(email as string);
        if (userEmail && userEmail.id !== id) {
            return new ErrorApp(MESSAGES.ERROR.ALREADY.USER, 400, MESSAGE_CODE.BAD_REQUEST);
        }
    }

    if (image) {
        if(typeof image !== 'string') {
            return new ErrorApp(MESSAGES.ERROR.INVALID.FILE_TYPE, 400, MESSAGE_CODE.BAD_REQUEST);
        }
    }
}