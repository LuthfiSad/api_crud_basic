import { MESSAGE_CODE } from "../../utils/MessageCode";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp } from "../../utils/Response.Mapper";
import { ItemResponseBodyDTO } from "./itemTypes"; // Ubah import sesuai dengan interface yang sudah diperbarui

export const createItemValidate = async ({
    itemCode,
    itemName,
    price,
    stock,
  }: ItemResponseBodyDTO) => {
    if (!itemCode) {
      return new ErrorApp(MESSAGES.ERROR.REQUIRED.ITEM_CODE, 400, MESSAGE_CODE.BAD_REQUEST);
    }
    
    if (!itemName) {
      return new ErrorApp(MESSAGES.ERROR.REQUIRED.ITEM_NAME, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    if(!price) {
      return new ErrorApp(MESSAGES.ERROR.REQUIRED.PRICE, 400, MESSAGE_CODE.BAD_REQUEST);
    }
  
    const priceNumber = parseFloat(String(price));
    if (price === undefined || price < 0 || isNaN(priceNumber)) {
      return new ErrorApp(MESSAGES.ERROR.INVALID.PRICE, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    if(!stock) {
      return new ErrorApp(MESSAGES.ERROR.REQUIRED.STOCK, 400, MESSAGE_CODE.BAD_REQUEST);
    }
  
    const stockNumber = parseInt(String(stock), 10);
    if (stock < 0 || isNaN(stockNumber)) {
      return new ErrorApp(MESSAGES.ERROR.INVALID.STOCK, 400, MESSAGE_CODE.BAD_REQUEST);
    }
  };
  
  export const updateItemValidate = async ({
    itemCode,
    itemName,
    price,
    stock,
  }: ItemResponseBodyDTO) => {
    if (itemCode && typeof itemCode !== 'string') {
      return new ErrorApp(MESSAGES.ERROR.INVALID.ITEM_CODE, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    if (itemName && typeof itemName !== 'string') {
      return new ErrorApp(MESSAGES.ERROR.INVALID.ITEM_NAME, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    if (price) {
      const priceNumber = parseFloat(String(price));
      if (price < 0 || isNaN(priceNumber)) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.PRICE, 400, MESSAGE_CODE.BAD_REQUEST);
      }
    }

    if (stock) {
      const stockNumber = parseInt(String(stock), 10);
      if (stock < 0 || isNaN(stockNumber)) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.STOCK, 400, MESSAGE_CODE.BAD_REQUEST);
      }
    }
  };
  
