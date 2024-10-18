export interface UserModelTypes {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFilterUser {
  search?: string;
  page?: number;
  perPage?: number;
}
