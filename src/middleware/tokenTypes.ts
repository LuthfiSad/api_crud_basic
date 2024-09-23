import { Request } from "express";

// Extend Request interface to include userId
export interface RequestWithUserId extends Request {
  userId?: string;
}

export interface TokenDecodeInterface{
  id: string
}