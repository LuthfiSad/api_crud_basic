import { NextFunction, Request, Response } from "express";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp, HandleResponseApi } from "../../utils/Response.Mapper";
import { createOrderService, deleteOrderService, getOrderByIdService, getOrderService, updateOrderService } from "./orderService";
import { MESSAGE_CODE } from "../../utils/MessageCode";
import { RequestWithUserId } from "../../middleware/tokenTypes";

export const getOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, perPage, search, userId, productId } = req.query;

  const orders = await getOrderService({
    search: search as string,
    page: page ? Number(page) : undefined,
    perPage: perPage ? Number(perPage) : undefined,
    userId: userId ? userId as string : undefined,
    productId: productId ? productId as string : undefined,
  });

  if (orders instanceof ErrorApp) {
    next(orders);
    return;
  }

  HandleResponseApi(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ORDER.GET, orders.data, orders.meta);
};

export const getOrderByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const order = await getOrderByIdService(id);

  if (order instanceof ErrorApp) {
    next(order);
    return;
  }

  HandleResponseApi(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ORDER.GET, order);
};

export const getOrdersByProfileAndProductIdController = async (
  req: RequestWithUserId,
  res: Response,
  next: NextFunction
) => {
  const { productId, page, perPage, search } = req.query;

  const orders = await getOrderService({
    search: search as string,
    page: page ? Number(page) : undefined,
    perPage: perPage ? Number(perPage) : undefined,
    userId: req.userId,
    productId: productId ? productId as string : undefined,
  });

  if (orders instanceof ErrorApp) {
    next(orders);
    return;
  }

  HandleResponseApi(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ORDER.GET, orders.data, orders.meta);
};

export const createOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const orderData = req.body; // Dapatkan data order dari request body

  const order = await createOrderService(orderData);

  if (order instanceof ErrorApp) {
    next(order);
    return;
  }

  HandleResponseApi(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.ORDER);
};

export const updateOrderController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const orderData = { ...req.body, id }; // Gabungkan data order dengan id

  const order = await updateOrderService(orderData);

  if (order instanceof ErrorApp) {
    next(order);
    return;
  }

  HandleResponseApi(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ORDER.UPDATE, order);
};

export const deleteOrderController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const order = await deleteOrderService(id);
  if (order instanceof ErrorApp) {
    next(order);
    return;
  }

  HandleResponseApi(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ORDER.DELETE);
};
