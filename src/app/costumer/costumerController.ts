import { NextFunction, Request, Response } from "express";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp, HandleResponseApi } from "../../utils/Response.Mapper";
import {
  createCustomerService,
  deleteCustomerService,
  getCustomerByIdService,
  getCustomerService,
  updateCustomerService,
} from "./costumerService";
import { MESSAGE_CODE } from "../../utils/MessageCode";
import { Gender } from "@prisma/client";
// import { RequestWithUserId } from "../../middleware/tokenTypes";

export const getCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, perPage, search, incomeFrom, incomeTo, gender, profession } =
    req.query;

  const customers = await getCustomerService({
    search: search as string,
    page: page ? Number(page) : undefined,
    perPage: perPage ? Number(perPage) : undefined,
    incomeFrom: incomeFrom ? Number(incomeFrom) : undefined,
    incomeTo: incomeTo ? Number(incomeTo) : undefined,
    gender: gender
      ? (((gender as string).charAt(0).toUpperCase() +
          (gender as string).slice(1).toLowerCase()) as Gender)
      : undefined,
    profession: profession ? (profession as string) : undefined,
  });

  if (customers instanceof ErrorApp) {
    next(customers);
    return;
  }

  HandleResponseApi(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.CUSTOMER.GET,
    customers.data,
    customers.meta
  );
};

export const getCustomerByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const CUSTOMER = await getCustomerByIdService(id);

  if (CUSTOMER instanceof ErrorApp) {
    next(CUSTOMER);
    return;
  }

  HandleResponseApi(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.CUSTOMER.GET,
    CUSTOMER
  );
};

export const createCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customerData = req.body; // Dapatkan data customer dari request body

  const customer = await createCustomerService(customerData);

  if (customer instanceof ErrorApp) {
    next(customer);
    return;
  }

  HandleResponseApi(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.CUSTOMER);
};

export const updateCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const customerData = { ...req.body, id }; // Gabungkan data customer dengan id

  const customer = await updateCustomerService(customerData);

  if (customer instanceof ErrorApp) {
    next(customer);
    return;
  }

  HandleResponseApi(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.CUSTOMER.UPDATE,
  );
};

export const deleteCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const customer = await deleteCustomerService(id);
  if (customer instanceof ErrorApp) {
    next(customer);
    return;
  }

  HandleResponseApi(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.CUSTOMER.DELETE
  );
};
