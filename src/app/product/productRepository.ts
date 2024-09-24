import { prisma } from "../../config/prismaConfig";
import { IFilterProduct, ProductResponseBodyDTO } from "./productTypes";

export const getProduct = async ({ page, perPage, search }: IFilterProduct) => {
  return await prisma.product.findMany({
    where: {
      name: {
        contains: search,
        mode: 'insensitive',
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: perPage,
    skip: (Number(page) - 1) * Number(perPage),
    select: {
      id: true,
      name: true,
      description: true,
      image: true,
      price: true,
      stock: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const getProductCount = async ({ search }: IFilterProduct) => {
  return await prisma.product.count({
    where: {
      name: {
        contains: search,
        mode: 'insensitive',
      },
    },
  });
};

export const getProductById = async (id: string) => {
  return await prisma.product.findFirst({
    where: {
      id,
    },
  });
};

export const createProduct = async (data: ProductResponseBodyDTO) => {
  return await prisma.product.create({
    data: {
      name: data.name as string,
      description: data.description as string,
      image: data.image as string,
      price: data.price as number,
      stock: data.stock as number,
    },
    select: {
      id: true,
      name: true,
      description: true,
      image: true,
      price: true,
      stock: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const updateProduct = async (id: string, data: {
  name?: string;
  description?: string;
  image?: string;
  price?: number;
  stock?: number;
}) => {
  return await prisma.product.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteProduct = async (id: string) => {
  return await prisma.product.delete({
    where: {
      id,
    },
  });
};
