import { MESSAGE_CODE } from "../../utils/MessageCode";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp } from "../../utils/Response.Mapper";
import { ProductResponseBodyDTO } from "./productTypes"; // Ubah import sesuai

export const createProductValidate = async ({ name, price, stock, image }: ProductResponseBodyDTO) => {
    if (!name) {
        return new ErrorApp(MESSAGES.ERROR.REQUIRED.NAME, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    if (!price) {
        return new ErrorApp(MESSAGES.ERROR.REQUIRED.PRICE, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    // Validasi apakah price bisa dikonversi ke number
    const priceNumber = parseFloat(String(price));
    if (isNaN(priceNumber) || priceNumber < 0) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.PRICE, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    if (!stock) {
        return new ErrorApp(MESSAGES.ERROR.REQUIRED.STOCK, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    // Validasi apakah stock bisa dikonversi ke number
    const stockNumber = parseInt(String(stock), 10);
    if (isNaN(stockNumber) || stockNumber < 0) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.STOCK, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    if (!image) {
        return new ErrorApp(MESSAGES.ERROR.REQUIRED.IMAGE, 400, MESSAGE_CODE.BAD_REQUEST);
    }
};
  
export const updateProductValidate = async ({ price, stock }: ProductResponseBodyDTO) => {
    if (price) {
        const priceNumber = parseFloat(String(price));
        if (isNaN(priceNumber) || priceNumber < 0) {
            return new ErrorApp(MESSAGES.ERROR.INVALID.PRICE, 400, MESSAGE_CODE.BAD_REQUEST);
        }
    }

    if (stock) {
        const stockNumber = parseInt(String(stock), 10);
        if (isNaN(stockNumber) || stockNumber < 0) {
            return new ErrorApp(MESSAGES.ERROR.INVALID.STOCK, 400, MESSAGE_CODE.BAD_REQUEST);
        }
    }
}