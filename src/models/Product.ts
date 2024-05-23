import { PrismaClient } from '@prisma/client';
import { searchQueryType } from '../controllers/productController';
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

        select: {
          name: true,
          slug: true,
          description: true,
          additionalInformation: true,
          id: true,
          markedPrice: true,
          discount: true,
          details: true,
          totalStocks: true,
          variants: true,
          reviews: true,
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
  async searchProduct(searchQuery: searchQueryType) {
    try {
      const products = await prisma.product.findMany({
        skip: (searchQuery.currentPage - 1) * searchQuery.pageSize,
        take: searchQuery.pageSize,
        where: {
          name: {
            contains: searchQuery.name,
          },
        },
        select: {
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
              parent: {
                select: {
                  name: true,
                  slug: true,
                },
              },
            },
          },
          variants: {
            select: {
              value: true,
              type: true,
            },
          },

          name: true,
          slug: true,
          markedPrice: true,
          discount: true,
          id: true,
        },
      });
      const productCount = products.length;
      return { ...products, availabileProducts: productCount };
    } catch (error: any) {
      // throw error.message;
      return false;
    }
  }
}

export default new Product();
