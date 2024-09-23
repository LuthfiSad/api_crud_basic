export type Role = "admin" | "anggota";

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
  role?: Role | string;
}
