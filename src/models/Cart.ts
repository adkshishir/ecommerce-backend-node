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
      // check if the user already has the product in cart
      const check = await prisma.cart.findFirst({
        where: {
          userId: data.userId,
          productId: data.productId,
        },
      });
      if (check) {
        const cart = await prisma.cart.update({
          where: {
            id: check.id,
          },
          data: {
            ...data,
            quantity: check.quantity + data.quantity,
          },
        });
        return cart;
      }
      const cart = await prisma.cart.create({
        data: {
          userId: data.userId,
          productId: data.productId,
          quantity: data.quantity,
          // variantId: data.variantId || null,
        },
      });
      return cart;
    } catch (error: any) {
      throw error?.message || error;
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
    console.log(id);
    try {
      const cart = await prisma.cart.delete({
        where: {
          id: Number(id)||undefined,
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
        select: {
          id: true,
          quantity: true,
          product: {
            select: {
              name: true,
              slug: true,
              markedPrice: true,
              discount: true,
              media: {
                select: {
                  url: true,
                  alt: true,
                },
                take: 1,
                orderBy: {
                  id: 'desc',
                },
              },
            },
          },
          variantId: true,
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
