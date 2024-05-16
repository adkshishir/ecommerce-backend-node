import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
class Product {
  async getAll() {
    try {
      const products = await prisma.product.findMany({
        include: {
          media: {
            select: {
              url: true,
              alt: true,
            },
          },
          category: {
            select: {
              name: true,
              slug: true,
              id: true,
              media: {
                select: {
                  name: true,
                  url: true,
                  alt: true,
                },
              },
            },
          },
        },
      });
      const productsWithSingleImage = products.map((product) => {
        if (product.media.length > 0) {
          const media = product.media[0];
          return {
            ...product,
            media: media,
          };
        } else {
          return {
            ...product,
            media: null,
          };
        }
      });
      return productsWithSingleImage;
    } catch (error: any) {
      throw error.message;
    }
  }
  async getBySlug(slug: string) {
    try {
      const product = await prisma.product.findFirst({
        where: {
          slug: slug,
        },
        include: {
          media: {
            orderBy: {
              id: 'desc',
            },
            select: {
              url: true,
              alt: true,
            },
          },
          category: {
            select: {
              name: true,
              slug: true,
              id: true,
              media: {
                select: {
                  name: true,
                  url: true,
                  alt: true,
                },
              },
            },
          },
        },
      });
      return { ...product, media: product?.media[0] || null };
    } catch (error: any) {
      throw error.message;
    }
  }

  async store(data: any) {
    try {
      const product = await prisma.product.create({
        data: data,
      });
      return product;
    } catch (error: any) {
      return error.message;
    }
  }
  async update(id: number | string, data: any) {
    try {
      const product = await prisma.product.update({
        where: {
          id: Number(id),
        },
        data: data,
      });
      return product;
    } catch (error: any) {
      return error.message;
    }
  }

  async delete(id: number) {
    try {
      const product = await prisma.product.delete({
        where: {
          id: Number(id),
        },
      });
      return product;
    } catch (error: any) {
      throw error.message;
    }
  }
}

export default new Product();
