export interface ProductModelTypes {
  id?: string;
  name?: string;
  description?: string;
  image?: string;
  price?: number;
  stock?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFilterProduct {
  search?: string;
  page?: number;
  perPage?: number;
}

export interface ProductResponseBodyDTO {
  id?: string;
  name?: string;
  description?: string;
  image?: string;
  price?: number;
  stock?: number;
}
