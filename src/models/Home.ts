import { PrismaClient, Product } from '@prisma/client';
const prisma = new PrismaClient();

class Home {
  async getMenuData() {
    const menuDataWithParentCategories = prisma.parentCategory.findMany({
      select: {
        name: true,
        slug: true,
        description: true,
        media: {
          select: {
            url: true,
          },
          take: 1,
          orderBy: {
            id: 'desc',
          },
          distinct: 'parentCategoryId',
        },
        categories: {
          select: {
            // counts products
            _count: {
              select: {
                products: true,
              },
            },
            name: true,
            slug: true,
            products: {
              select: {
                name: true,
                slug: true,
                // media: {
                //   select: {
                //     url: true,
                //   },
                //     take: 1,
                //   distinct:'productId',
                //   orderBy: {
                //     id: 'desc',
                //   },
                // },
              },
            },
            // media: {
            //   select: {
            //     url: true,
            //   },
            //     take: 1,
            //   distinct:'categoryId',
            //   orderBy: {
            //     id: 'desc',
            //   },
            // },
          },
        },
      },
    });
    const menuDataWithOutParentCategories = prisma.category.findMany({
      select: {
        name: true,
        slug: true,
        // counts products
        _count: {
          select: {
            products: true,
          },
        },
        media: {
          select: {
            url: true,
          },
          take: 1,
          orderBy: {
            id: 'desc',
          },
        },
        products: {
          select: {
            name: true,
            slug: true,
            media: {
              select: {
                url: true,
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
    return {
      menuDataWithParentCategories,
      menuDataWithOutParentCategories,
    };
  }
  async getLatestProducts() {
    const latestProducts = prisma.product.findMany({
      orderBy: {
        id: 'desc',
      },
      take: 4,
      select: {
        name: true,
        slug: true,
        media: {
          select: {
            url: true,
          },
          take: 1,
          orderBy: {
            id: 'desc',
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
      },
    });
    return latestProducts;
  }

  async topSellingProducts() {
    const products = prisma.product.findMany({
      orderBy: {
        id: 'desc',
      },
      take: 4,
      select: {
        reviews: {
          select: {
            review: true,
          },
        },
        name: true,
        slug: true,
        media: {
          select: {
            url: true,
          },
          take: 1,
          orderBy: {
            id: 'desc',
          },
        },
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    });
    //   count reviews
    const productsWithReviewCount = (await products).map((product) => {
      return {
        ...product,
        reviewCount: product.reviews.length,
      };
    });
    const topSellingProducts = productsWithReviewCount
      .sort((a, b) => b.reviewCount - a.reviewCount)
      .slice(0, 4);
    return topSellingProducts;
  }
  async searchProduct(query: string) {
    const products = prisma.product.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      select: {
        name: true,
        slug: true,
        media: {
          select: {
            url: true,
          },
          take: 1,
          orderBy: {
            id: 'desc',
          },
        },
      },
    });
    return products;
  }
  async getSpecialCategories() {
    const specialCategories = prisma.category.findMany({
      select: {
        name: true,
        slug: true,
        media: {
          select: {
            url: true,
          },
          take: 1,
          orderBy: {
            id: 'desc',
          },
        },
        products: {
          where: {
            discount: {
              gte: 0.2,
            },
          },
          select: {
            name: true,
            slug: true,
            media: {
              select: {
                url: true,
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
    return specialCategories;
  }
}

export default new Home();
