import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class User {
  async getByEmail(email: string) {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    return user;
  }
  async store(data: any) {
    const user = await prisma.user.create({
      data: data,
    });
    return user;
  }
  async getProfile(id: string) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
        select: {
          name: true,
          email: true,
          id: true,
          _count: {
            select: {
              Wishlists: true,
              carts: true,
              Orders: true,
            },
          },
          role: true,
          carts: {
            select: {
              id: true,
              quantity: true,
              product: {
                select: {
                  name: true,
                  slug: true,
                },
              },
            },
          },
          Wishlists: {
            select: {
              id: true,
              product: {
                select: {
                  name: true,
                  slug: true,
                },
              },
            },
          },
          Orders: {
            select: {
              id: true,
              status: true,
              paymentMethod: true,
              createdAt: true,
              orderItems: {
                select: {
                  quantity: true,
                  product: {
                    select: {
                      name: true,
                      slug: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      return user;
    } catch (error: any) {
      throw error.message;
    }
  }
}
export default new User();
