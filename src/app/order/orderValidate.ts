import { MESSAGE_CODE } from "../../utils/MessageCode";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp } from "../../utils/Response.Mapper";
import { OrderResponseBodyDTO } from "./orderTypes"; // Ubah import sesuai dengan interface yang sudah diperbarui

export const createOrderValidate = async ({ userId, productId, quantity }: OrderResponseBodyDTO) => {
    if (!userId) {
        return new ErrorApp(MESSAGES.ERROR.REQUIRED.USER_ID, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    if (!productId) {
        return new ErrorApp(MESSAGES.ERROR.REQUIRED.PRODUCT_ID, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    if (!quantity) {
        return new ErrorApp(MESSAGES.ERROR.REQUIRED.QUANTITY, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    // Validasi apakah quantity bisa dikonversi ke number
    const quantityNumber = parseInt(String(quantity), 10);
    if (isNaN(quantityNumber) || quantity <= 0) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.QUANTITY, 400, MESSAGE_CODE.BAD_REQUEST);
    }
};

export const updateOrderValidate = async ({ quantity }: OrderResponseBodyDTO) => {
    if (quantity) {
        // Validasi apakah quantity bisa dikonversi ke number
        const quantityNumber = parseInt(String(quantity), 10);
        if (isNaN(quantityNumber) || quantity <= 0) {
            return new ErrorApp(MESSAGES.ERROR.INVALID.QUANTITY, 400, MESSAGE_CODE.BAD_REQUEST);
        }
    }
};
