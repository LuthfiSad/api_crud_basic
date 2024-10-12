import { prisma } from "../../config/prismaConfig";
import { IFilterCustomer, CustomerResponseBodyDTO } from "./costumerTypes";
import { Gender, Prisma } from "@prisma/client";

// Mengambil daftar pelanggan
export const getCustomer = async ({
  page,
  perPage,
  search,
  incomeFrom,
  incomeTo,
  gender,
  profession,
}: IFilterCustomer) => {
  const filter = {} as { OR: Prisma.CustomerWhereInput[] };

  if (search) {
    filter.OR = [
      { customerId: { equals: Number(search) || undefined } },
      {
        gender: {
          equals: [Gender.Female, Gender.Male].includes(search as Gender)
            ? (search as Gender)
            : undefined,
        },
      },
      { age: { equals: Number(search) || undefined } },
      { annualIncome: { equals: Number(search) || undefined } },
      { spendingScore: { equals: Number(search) || undefined } },
      { profession: { contains: search, mode: "insensitive" } },
      { workExperience: { equals: Number(search) || undefined } },
      { familySize: { equals: Number(search) || undefined } },
    ];
  }

  return await prisma.customer.findMany({
    where: {
      AND: [
        filter,
        ...(incomeFrom !== undefined
          ? [{ annualIncome: { gte: incomeFrom } }]
          : []),
        ...(incomeTo !== undefined
          ? [{ annualIncome: { lte: incomeTo } }]
          : []),
        ...(gender ? [{ gender }] : []),
        ...(profession ? [{ profession }] : []),
      ],
    },
    take: perPage,
    skip: (Number(page) - 1) * Number(perPage),
  });
};

// Menghitung jumlah pelanggan
export const getCustomerCount = async ({
  search,
  incomeFrom,
  incomeTo,
  gender,
  profession,
}: IFilterCustomer) => {
  const filter = {} as { OR: Prisma.CustomerWhereInput[] };

  if (search) {
    filter.OR = [
      { customerId: { equals: Number(search) || undefined } },
      {
        gender: {
          equals: [Gender.Female, Gender.Male].includes(search as Gender)
            ? (search as Gender)
            : undefined,
        },
      },
      { age: { equals: Number(search) || undefined } },
      { annualIncome: { equals: Number(search) || undefined } },
      { spendingScore: { equals: Number(search) || undefined } },
      { profession: { contains: search, mode: "insensitive" } },
      { workExperience: { equals: Number(search) || undefined } },
      { familySize: { equals: Number(search) || undefined } },
    ];
  }

  return await prisma.customer.count({
    where: {
      AND: [
        filter,
        ...(incomeFrom !== undefined
          ? [{ annualIncome: { gte: incomeFrom } }]
          : []),
        ...(incomeTo !== undefined
          ? [{ annualIncome: { lte: incomeTo } }]
          : []),
        ...(gender ? [{ gender }] : []),
        ...(profession ? [{ profession }] : []),
      ],
    },
  });
};

// Mengambil pelanggan berdasarkan ID
export const getCustomerById = async (id: string) => {
  return await prisma.customer.findFirst({
    where: {
      id: id,
    },
  });
};

// Membuat pelanggan
export const createCustomer = async (data: CustomerResponseBodyDTO) => {
  return await prisma.customer.create({
    data: {
      customerId: data.customerId as number,
      gender: data.gender as Gender,
      age: data.age as number,
      annualIncome: data.annualIncome as number,
      spendingScore: data.spendingScore as number,
      profession: data.profession as string,
      workExperience: data.workExperience as number,
      familySize: data.familySize as number,
    },
  });
};

// Memperbarui pelanggan
export const updateCustomer = async (
  id: string,
  data: CustomerResponseBodyDTO
) => {
  return await prisma.customer.update({
    where: {
      id,
    },
    data,
  });
};

// Menghapus pelanggan
export const deleteCustomer = async (id: string) => {
  return await prisma.customer.delete({
    where: {
      id,
    },
  });
};
