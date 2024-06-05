import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
class Order {
  // Store using prisma
  async store(data: any) {
    try {
      const order = await prisma.order.create({
        data: data,
      });
      return order;
    } catch (error) {
      throw error;
    }
  }
  // get all orders
  async getAll() {
    try {
      const orders = await prisma.order.findMany();
      return orders;
    } catch (error) {
      throw error;
    }
  }
  // get user orders
  async getByUserId(id: string) {
    try {
      const orders = await prisma.order.findMany({
        where: {
          userId: id,
        },
      });
      return orders;
    } catch (error) {
      throw error;
    }
  }
  async update(id: number, data: any) {
    try {
      const order = await prisma.order.update({
        where: {
          id: Number(id),
        },
        data: data,
      });
      return order;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number) {
    try {
      const order = await prisma.order.delete({
        where: {
          id: Number(id),
        },
      });
      return order;
    } catch (error) {
      throw error;
    }
  }
  async getById(id: number) {
    try {
      const order = await prisma.order.findFirst({
        where: {
          id: Number(id),
        },
      });
      return order;
    } catch (error) {
      throw error;
    }
  }
}

export default new Order();