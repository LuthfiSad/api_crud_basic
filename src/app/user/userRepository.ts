import { Prisma } from "@prisma/client";
import { prisma } from "../../config/prismaConfig";
import { RegisterAuthBodyDTO } from "../auth/authTypes";
import { IFilterUser } from "./userTypes";

export const getUser = async ({ page, perPage, search }: IFilterUser) => {
  const filter = {} as { OR: Prisma.UserWhereInput[] };

  if (search) {
    filter.OR = [
      {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        email: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }
  return await prisma.user.findMany({
    where: {
      ...filter,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: perPage,
    skip: (Number(page) - 1) * Number(perPage),
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  });
};

export const getUserCount = async ({ search }: IFilterUser) => {
  const filter = {} as { OR: Prisma.UserWhereInput[] };

  if (search) {
    filter.OR = [
      {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        email: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }
  return await prisma.user.count({
    where: {
      ...filter,
    },
  });
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  });
};

export const getUserById = async (id: string) => {
  return await prisma.user.findFirst({
    where: {
      id,
    },
  });
};

export const createUser = async (data: RegisterAuthBodyDTO) => {
  return await prisma.user.create({
    data: {
      name: data.name as string,
      email: data.email as string,
      password: data.password as string,
      image: data.image as string,
    },
    // select: {
    //   id: true,
    // },
  });
};

export const updateUser = async (id: string, data: RegisterAuthBodyDTO) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteUser = async (id: string) => {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
};
