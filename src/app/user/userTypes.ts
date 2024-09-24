// import { Role } from "@prisma/client"

import { Role } from "@prisma/client";

export interface UserModelTypes {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  role?: Role;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFilterUser {
  search?: string;
  page?: number;
  perPage?: number;
  role?: Role;
}
