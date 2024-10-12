import { MESSAGE_CODE } from "../../utils/MessageCode";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp, Meta } from "../../utils/Response.Mapper";
import { ItemModelTypes, IFilterItem } from "./itemTypes"; // Ubah import sesuai dengan interface yang sudah diperbarui
import {
  createItem,
  deleteItem,
  getItem,
  getItemById,
  getItemCount,
  updateItem,
} from "./itemRepository";
import { createItemValidate, updateItemValidate } from "./itemValidate";

export const getItemService = async ({
  search,
  page = 1,
  perPage = 10,
  priceFrom,
  priceTo,
}: IFilterItem) => {
  const [customers, totalData] = await Promise.all([
    getItem({ search, page, perPage, priceFrom, priceTo }),
    getItemCount({ search, priceFrom, priceTo }),
  ]);

  // if (!customers.length) {
  //   return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ITEM, 404, MESSAGE_CODE.NOT_FOUND);
  // }

  const response = { data: customers, meta: Meta(page, perPage, totalData) };
  return response;
};

export const getItemByIdService = async (id: string) => {
  if (!id) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.ID,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const customer = await getItemById(id);
  if (!customer) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.ITEM,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }
  return customer;
};

export const createItemService = async ({
  itemCode,
  itemName,
  price,
  stock,
}: ItemModelTypes) => {
  const validate = await createItemValidate({
    itemCode,
    itemName,
    price,
    stock,
  });
  if (validate instanceof ErrorApp) {
    return new ErrorApp(validate.message, validate.statusCode, validate.code);
  }

  const response = await createItem({
    itemCode,
    itemName,
    price: parseFloat(String(price)),
    stock: parseInt(String(stock), 10),
  });

  return response;
};

export const updateItemService = async ({
  id,
  itemCode,
  itemName,
  price,
  stock,
}: ItemModelTypes) => {
  if (!id) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.ID,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const customer = await getItemById(id);
  if (!customer) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.ITEM,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }

  const validate = await updateItemValidate({
    itemCode,
    itemName,
    price,
    stock,
  });
  if (validate instanceof ErrorApp) {
    return new ErrorApp(validate.message, validate.statusCode, validate.code);
  }

  const updatedFields: Partial<ItemModelTypes> = {};

  if (itemCode) updatedFields.itemCode = itemCode;
  if (itemName) updatedFields.itemName = itemName;
  if (price)
    updatedFields.price = parseFloat(String(price));
  if (stock) updatedFields.stock = parseInt(String(stock), 10);

  const response = await updateItem(id, updatedFields);
  return response;
};

export const deleteItemService = async (id: string) => {
  if (!id) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.ID,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const customer = await getItemById(id);
  if (!customer) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.ITEM,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }

  const response = await deleteItem(id);
  return response;
};
