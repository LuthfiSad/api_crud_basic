import { prisma } from "../../config/prismaConfig";
import { IFilterOrder, OrderResponseBodyDTO } from "./orderTypes";

// Mengambil daftar pesanan
export const getOrder = async ({ page, perPage, search, userId, productId }: IFilterOrder) => {
  return await prisma.order.findMany({
    where: {
      product: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
        id: productId,
      },
      user: {
        id: userId,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: perPage,
    skip: (Number(page) - 1) * Number(perPage),
    select: {
      id: true,
      quantity: true,
      totalPrice: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          name: true, // menambahkan data pengguna
        },
      },
      product: {
        select: {
          id: true,
          name: true, // menambahkan data produk
        },
      },
    },
  });
};

// Menghitung jumlah pesanan
export const getOrderCount = async ({ search }: IFilterOrder) => {
  return await prisma.order.count({
    where: {
      product: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
    },
  });
};

// Mengambil pesanan berdasarkan ID
export const getOrderById = async (id: string) => {
  return await prisma.order.findFirst({
    where: {
      id,
    },
    include: {
      user: true,    // menyertakan informasi pengguna
      product: true, // menyertakan informasi produk
    },
  });
};

// Membuat pesanan
export const createOrder = async (data: OrderResponseBodyDTO) => {
  return await prisma.order.create({
    data: {
      userId: data.userId as string,
      productId: data.productId as string,
      quantity: data.quantity as number, 
      totalPrice: data.totalPrice as number,
    },
    select: {
      id: true,
      quantity: true,
      totalPrice: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      product: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

// Memperbarui pesanan
export const updateOrder = async (id: string, data: {
  quantity?: number;
  totalPrice?: number;
}) => {
  return await prisma.order.update({
    where: {
      id,
    },
    data,
  });
};

// Menghapus pesanan
export const deleteOrder = async (id: string) => {
  return await prisma.order.delete({
    where: {
      id,
    },
  });
};
