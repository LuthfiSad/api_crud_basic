
import { prisma } from "../../config/prismaConfig"
import { RegisterAuthBodyDTO } from "../auth/userTypes"
import { IFilterUser } from "./userTypes"

export const getUser = async ({ page, perPage, search, role }: IFilterUser) => {
  return await prisma.user.findMany({
      where: {
          name: {
              contains: search,
              mode: 'insensitive'
          },
          role: role
      },
      orderBy: {
          createdAt: 'desc'
      },
      take: perPage,
      skip: (Number(page) - 1) * Number(perPage),
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
      }
  })
}

export const getUserCount = async ({ search, role }: IFilterUser) => {
  return await prisma.user.count({
      where: {
          name: {
              contains: search,
              mode: 'insensitive'
          },
          role: role
      },
  })
}

export const getUserByEmail = async (email: string) => {
    return await prisma.user.findFirst({
        where: {
            email
        },
    })
}

export const getUserById = async (id: string) => {
    return await prisma.user.findFirst({
        where: {
            id
        },
    })
}

export const createUser = async (data: RegisterAuthBodyDTO) => {
    return await prisma.user.create({
        data,
        select: {
            id: true,
            role: true
        }
    })
}