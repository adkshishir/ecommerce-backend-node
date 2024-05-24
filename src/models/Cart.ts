import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export type cartType = {
  userId: string;
  productId: number;
  quantity: number;
  variantId: number;
};
class Cart {
  async store(data: cartType) {
    try {
      const cart = await prisma.cart.create({
        data: data,
      });
      return cart;
    } catch (error: any) {
      throw error.message;
    }
  }
  async update(id: number, data: cartType) {
    try {
      const cart = await prisma.cart.update({
        where: {
          id: Number(id),
        },
        data: data,
      });
      return cart;
    } catch (error: any) {
      throw error.message;
    }
  }

  async delete(id: number) {
    try {
      const cart = await prisma.cart.delete({
        where: {
          id: Number(id),
        },
      });
      return cart;
    } catch (error: any) {
      throw error.message;
    }
  }
  // delete user cart
  async deleteByUserId(id: string) {
    try {
      const cart = await prisma.cart.deleteMany({
        where: {
          userId: id,
        },
      });
      return cart;
    } catch (error: any) {
      // throw error.message;
      return false;
    }
  }

  async getById(id: number) {
    try {
      const cart = await prisma.cart.findFirst({
        where: {
          id: Number(id),
        },
      });
      return cart;
    } catch (error: any) {
      throw error.message;
    }
  }
  // get user cart
  async getByUserId(id: string) {
    try {
      const cart = await prisma.cart.findMany({
        where: {
          userId: id,
        },
      });
      return cart;
    } catch (error: any) {
      return false;
      // throw error.message;
    }
  }
}

export default new Cart();
