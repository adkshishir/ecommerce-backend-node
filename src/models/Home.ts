import { PrismaClient, Product } from '@prisma/client';
import { searchQueryType } from '../controllers/productController';
const prisma = new PrismaClient();

class Home {
  async getMenuData() {
    const menuDataWithParentCategories = await prisma.parentCategory.findMany({
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
    const menuDataWithOutParentCategories = await prisma.category.findMany({
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
  async searchProduct(searchQuery: searchQueryType) {
    let varientSomeCondition:
      | {
          some: {
            OR: {
              value: string;
            }[];
          };
        }
      | undefined = undefined;
    if (!searchQuery.color && !searchQuery.size) {
      varientSomeCondition = undefined;
    } else if (!searchQuery.color && searchQuery.size) {
      varientSomeCondition = {
        some: {
          OR: [{ value: searchQuery.size }],
        },
      };
    }
    if (!searchQuery.size && searchQuery.color) {
      varientSomeCondition = {
        some: {
          OR: [{ value: searchQuery.color }],
        },
      };
    }
    if (searchQuery.color && searchQuery.size) {
      varientSomeCondition = {
        some: {
          OR: [
            {
              value: searchQuery.color,
            },
            {
              value: searchQuery.size,
            },
          ],
        },
      };
    }
    let skip: number = 0;
    let take: number = 10;

    if (Number(searchQuery.currentPage) && Number(searchQuery.pageSize)) {
      skip =
        (Number(searchQuery.currentPage) - 1) * Number(searchQuery.pageSize);
      take = Number(searchQuery.pageSize);
    } else if (Number(searchQuery.currentPage)) {
      skip = (Number(searchQuery.currentPage) - 1) * 10;
    } else if (Number(searchQuery.pageSize)) {
      take = Number(searchQuery.pageSize);
    }

    try {
      const products = await prisma.product.findMany({
        skip,
        take,
        where: {
          name: {
            contains: searchQuery.name,
          },
          markedPrice: {
            gte: Number(searchQuery.minPrice) || 0,
            lte: Number(searchQuery.maxPrice) || 1000000,
          },
          variants: varientSomeCondition,
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
      const totalProducts = await prisma.product.count();
      return { products, totalProducts };
    } catch (error: any) {
      // throw error.message;
      return false;
    }
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
