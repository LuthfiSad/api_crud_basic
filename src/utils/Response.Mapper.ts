import { type Response } from "express";
import { MetaResponse } from "../interface/ResponseInterface";

// Utility function for sending responses with data
export function ResponseWithData<Res = unknown>(
  res: Response,
  status: number,
  code: string,
  message: string,
  data: Res,
  meta?: MetaResponse
) {
  const response = {
    status,
    code,
    message,
    data,
    meta,
  };
  return res.status(status).json(response);
}

// Utility function for sending responses without data
export function ResponseWithoutData(
  res: Response,
  status: number,
  code: string,
  message: string
) {
  const response = {
    status,
    code,
    message,
  };
  return res.status(status).json(response);
}

export const Meta = (
  page: number,
  perPage: number,
  totalData: number
): MetaResponse => {
  return {
    page,
    perPage,
    totalData,
    totalPages: Math.ceil(totalData / perPage),
  };
};

export class ErrorApp extends Error {
  message: string;
  statusCode: number;
  code: string;
  constructor(message: string, statusCode: number, code: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.message = message;
  }
}

