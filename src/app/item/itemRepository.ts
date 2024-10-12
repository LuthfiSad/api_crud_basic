import { prisma } from "../../config/prismaConfig";
import { IFilterItem, ItemModelTypes, ItemResponseBodyDTO } from "./itemTypes";
import { Prisma } from "@prisma/client";

// Mengambil daftar pelanggan
export const getItem = async ({
  page,
  perPage,
  search,
  priceFrom,
  priceTo
}: IFilterItem) => {
  const filter = {} as { OR: Prisma.ItemWhereInput[] };

  if (search) {
    filter.OR = [
      { itemCode: { contains: search, mode: "insensitive" } },
      { itemName: { contains: search, mode: "insensitive" } },
    ];
  }

  return await prisma.item.findMany({
    where: {
      AND: [
        filter,
        ...(priceFrom !== undefined
          ? [{ price: { gte: priceFrom } }]
          : []),
        ...(priceTo !== undefined
          ? [{ price: { lte: priceTo } }]
          : []),
      ],
    },
    take: perPage,
    skip: (Number(page) - 1) * Number(perPage),
  });
};

// Menghitung jumlah pelanggan
export const getItemCount = async ({
  search,
  priceFrom,
  priceTo,
}: IFilterItem) => {
  const filter = {} as { OR: Prisma.ItemWhereInput[] };

  if (search) {
    filter.OR = [
      { itemCode: { contains: search, mode: "insensitive" } },
      { itemName: { contains: search, mode: "insensitive" } },
    ];
  }

  return await prisma.item.count({
    where: {
      AND: [
        filter,
        ...(priceFrom !== undefined
          ? [{ price: { gte: priceFrom } }]
          : []),
        ...(priceTo !== undefined
          ? [{ price: { lte: priceTo } }]
          : []),
      ],
    },
  });
};

// Mengambil pelanggan berdasarkan ID
export const getItemById = async (id: string) => {
  return await prisma.item.findFirst({
    where: {
      id: id,
    },
  });
};

// Membuat pelanggan
export const createItem = async (data: ItemModelTypes) => {
  return await prisma.item.create({
    data,
  });
};

// Memperbarui pelanggan
export const updateItem = async (
  id: string,
  data: ItemResponseBodyDTO
) => {
  return await prisma.item.update({
    where: {
      id,
    },
    data,
  });
};

// Menghapus pelanggan
export const deleteItem = async (id: string) => {
  return await prisma.item.delete({
    where: {
      id,
    },
  });
};
