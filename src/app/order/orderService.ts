import { MESSAGE_CODE } from "../../utils/MessageCode";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp, Meta } from "../../utils/Response.Mapper";
import { OrderModelTypes, IFilterOrder } from "./orderTypes"; // Ubah import sesuai dengan interface yang sudah diperbarui
import { createOrder, deleteOrder, getOrder, getOrderById, getOrderCount, updateOrder } from "./orderRepository";
import { createOrderValidate, updateOrderValidate } from "./orderValidate";
import { getProductById, updateProduct } from "../product/productRepository";
import { getUserById } from "../user/userRepository";

export const getOrderService = async ({ search, page = 1, perPage = 10, userId, productId }: IFilterOrder) => {
  const [orders, totalData] = await Promise.all([
    getOrder({ search, page, perPage, userId, productId }),
    getOrderCount({ search, userId, productId }),
  ]);

  if (!orders.length) {
    return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ORDER, 404, MESSAGE_CODE.NOT_FOUND);
  }

  const response = { data: orders, meta: Meta(page, perPage, totalData) };
  return response;
};

export const getOrderByIdService = async (id: string) => {
  if (!id) {
    return new ErrorApp(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
  }

  const order = await getOrderById(id);
  if (!order) {
    return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ORDER, 404, MESSAGE_CODE.NOT_FOUND);
  }
  return order;
};

export const createOrderService = async ({
  userId,
  productId,
  quantity,
}: OrderModelTypes) => {
  const validate = await createOrderValidate({ userId, productId, quantity });
  if (validate instanceof ErrorApp) {
    return new ErrorApp(validate.message, validate.statusCode, validate.code);
  }

  // Mengecek apakah user ada di database
  const user = await getUserById(userId);
  if (!user) {
    return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT, 404, MESSAGE_CODE.NOT_FOUND);
  }

  // Mendapatkan harga produk dari database
  const product = await getProductById(productId);
  if (!product) {
    return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.PRODUCT, 404, MESSAGE_CODE.NOT_FOUND);
  }

  if (product.stock < quantity) {
    return new ErrorApp(MESSAGES.ERROR.INVALID.QUANTITY_STOCK, 400, MESSAGE_CODE.BAD_REQUEST);
  }

  const totalPrice = product.price * quantity;

  const response = await createOrder({
    userId,
    productId,
    quantity,
    totalPrice,
  });
  updateProduct(product.id, { stock: product.stock - quantity });
  return response;
};

export const updateOrderService = async ({
  id,
  quantity,
}: Partial<OrderModelTypes>) => {
  if (!id) {
    return new ErrorApp(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
  }

  const order = await getOrderById(id);
  if (!order) {
    return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ORDER, 404, MESSAGE_CODE.NOT_FOUND);
  }

  const product = await getProductById(order.productId);
  if (!product) {
    return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.PRODUCT, 404, MESSAGE_CODE.NOT_FOUND);
  }

  const validate = await updateOrderValidate({ quantity });
  if (validate instanceof ErrorApp) {
    return new ErrorApp(validate.message, validate.statusCode, validate.code);
  }

  
  const updatedFields: Partial<OrderModelTypes> = {};
  
  if (quantity) {
    if (product.stock < quantity + order.quantity) {
      return new ErrorApp(MESSAGES.ERROR.INVALID.QUANTITY_STOCK, 400, MESSAGE_CODE.BAD_REQUEST);
    }
    updatedFields.quantity = parseInt(String(quantity), 10);;
    updatedFields.totalPrice = product.price * parseInt(String(quantity), 10); // Update totalPrice
    updateProduct(product.id, { stock: (product.stock + order.quantity) - quantity });
  }

  const response = await updateOrder(id, updatedFields);
  return response;
};

export const deleteOrderService = async (id: string) => {
  if (!id) {
    return new ErrorApp(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
  }

  const order = await getOrderById(id);
  if (!order) {
    return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ORDER, 404, MESSAGE_CODE.NOT_FOUND);
  }

  const response = await deleteOrder(id);
  return response;
};
