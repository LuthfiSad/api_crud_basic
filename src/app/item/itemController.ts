import { NextFunction, Request, Response } from "express";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp, HandleResponseApi } from "../../utils/Response.Mapper";
import {
  createItemService,
  deleteItemService,
  getItemByIdService,
  getItemService,
  updateItemService,
} from "./itemService";
import { MESSAGE_CODE } from "../../utils/MessageCode";
// import { RequestWithUserId } from "../../middleware/tokenTypes";

export const getItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, perPage, search, priceFrom, priceTo } =
    req.query;

  const customers = await getItemService({
    search: search as string,
    page: page ? Number(page) : undefined,
    perPage: perPage ? Number(perPage) : undefined,
    priceFrom: priceFrom ? Number(priceFrom) : undefined,
    priceTo: priceTo ? Number(priceTo) : undefined,
  });

  if (customers instanceof ErrorApp) {
    next(customers);
    return;
  }

  HandleResponseApi(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.ITEM.GET,
    customers.data,
    customers.meta
  );
};

export const getItemByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const ITEM = await getItemByIdService(id);

  if (ITEM instanceof ErrorApp) {
    next(ITEM);
    return;
  }

  HandleResponseApi(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.ITEM.GET,
    ITEM
  );
};

export const createItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customerData = req.body; // Dapatkan data customer dari request body

  const customer = await createItemService(customerData);

  if (customer instanceof ErrorApp) {
    next(customer);
    return;
  }

  HandleResponseApi(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.ITEM);
};

export const updateItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const customerData = { ...req.body, id }; // Gabungkan data customer dengan id

  const customer = await updateItemService(customerData);

  if (customer instanceof ErrorApp) {
    next(customer);
    return;
  }

  HandleResponseApi(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.ITEM.UPDATE,
  );
};

export const deleteItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const customer = await deleteItemService(id);
  if (customer instanceof ErrorApp) {
    next(customer);
    return;
  }

  HandleResponseApi(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.ITEM.DELETE
  );
};
