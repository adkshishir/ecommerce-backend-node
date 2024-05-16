import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
type CategoryDataType = {
  name: string;
  slug: string;
  parentId?: number;
  description?: string;
  status?: string;
};
class Category {
  async getAll() {
    const categories = await prisma.category.findMany({
      orderBy: {
        id: 'desc',
      },
      include: {
        parent: {
          select: {
            name: true,
            slug: true,
            id: true,
          },
        },
        media: {
          take: 1,
          orderBy: {
            id: 'desc',
          },
          select: {
            url: true,
            alt: true,
          },
        },
      },
    });
    const categoriesWithSingleMedia = categories.map((category) => {
      if (category.media.length > 0) {
        return { ...category, media: category.media[0] };
      } else {
        return { ...category, image: null };
      }
    });
    return categoriesWithSingleMedia;
  }

  async getBySlug(slug: string) {
    const category = await prisma.category.findFirst({
      where: {
        slug: slug,
      },
      orderBy: {
        id: 'desc',
      },
      include: {
        parent: {
          select: {
            name: true,
            slug: true,
            id: true,
          },
        },
        media: {
          orderBy: {
            id: 'desc',
          },
          select: {
            url: true,
            alt: true,
          },
        },
      },
    });
    return { ...category, media: category?.media[0] || null };
  }

  async store(data: CategoryDataType) {
    try {
      const category = await prisma.category.create({
        data: data,
      });
      return category;
    } catch (error: any) {
      throw error.message;
    }
  }
  async update(id: number, data: CategoryDataType) {
    const category = await prisma.category.update({
      where: {
        id: id,
      },
      data: data,
    });
    return category;
  }
  async delete(id: number) {
    const category = await prisma.category.delete({
      where: {
        id: id,
      },
    });
    return category;
  }
}

export default new Category();
