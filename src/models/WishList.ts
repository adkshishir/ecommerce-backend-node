
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
class Wishlist {
    async store(data: any) {
      try {
        // check if the product is liked or not already
        const check = await prisma.wishlist.findFirst({
          where: {
            userId: data.userId,
            productId: data.productId,
          },
        });
        if (check) {
          // unliked the product
          const wishlist = await prisma.wishlist.delete({
            where: {
              id: check.id,
            },
          });
          return wishlist;
        } else {
          const wishlist = await prisma.wishlist.create({
            data: data,
          });
          return wishlist;
        }
      } catch (error) {
        throw error;
      }
    }

    async update(id: number, data: any) {
        try {
            const wishlist = await prisma.wishlist.update({
                where: {
                    id: Number(id),
                },
                data: data,
            });
            return wishlist;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number) {
        try {
            const wishlist = await prisma.wishlist.delete({
                where: {
                    id: Number(id),
                },
            });
            return wishlist;
        } catch (error) {
            throw error;
        }
    }

    async getById(id: number) {
        try {
            const wishlist = await prisma.wishlist.findFirst({
                where: {
                    id: Number(id),
                },
            });
            return wishlist;
        } catch (error) {
            throw error;
        }
    }

    async getByUserId(id: string) {
        try {
            const wishlist = await prisma.wishlist.findMany({
              where: {
                userId: id,
              },
              select: {
                id: true,
                productId: true,
                product: {
                  select: {
                        name: true,
                        totalStocks: true,
                        markedPrice: true,
                        discount: true,
                    slug: true,
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
              },
            });
            return wishlist;
        } catch (error) {
            throw error;
        }
    }
}

export default new Wishlist();