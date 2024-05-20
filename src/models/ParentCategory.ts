import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
type ParentCategoryDataType = {
  name: string;
  description?: string;
  slug: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
};
class ParentCategory {
  getById(arg0: number) {
    throw new Error('Method not implemented.');
  }
  // Store using prisma
  async store(data: ParentCategoryDataType) {
    try {
      const parentCategory = await prisma.parentCategory.create({
        data: data,
      });
      return parentCategory;
    } catch (error) {
      throw error;
    }
  }
  async getAll() {
    const parentCategories = await prisma.parentCategory.findMany({
      orderBy: {
        id: 'desc',
      },
      include: {
        media: {
          select: {
            url: true,
            alt: true,
          },
        },
      },
    });
    const parentCategoriesWithSingleImage = parentCategories.map(
      (parentCategory:any) => {
        if (parentCategory.media.length > 0) {
          const media = parentCategory.media[0];
          return {
            ...parentCategory,
            media: media,
          };
        } else {
          return {
            ...parentCategory,
            media: null,
          };
        }
      }
    );
    return parentCategoriesWithSingleImage;
  }
  async getBySlug(slug: string) {
    try {
      const parentCategory = await prisma.parentCategory.findFirst({
        where: {
          slug: slug,
        },
        orderBy: {
          id: 'desc',
        },
        include: {
          media: {
            select: {
              url: true,
              alt: true,
            },
          },
        },
      });
      return { ...parentCategory, media: parentCategory?.media[0] || null };
    } catch (error: any) {
      throw error.message;
    }
  }
  async update(id: number, data: ParentCategoryDataType) {
    try {
      const parentCategory = await prisma.parentCategory.update({
        where: {
          id: Number(id),
        },
        data: data,
      });
     
      return parentCategory;
    } catch (error: any) {
      throw error.message;
    }
  }
  async delete(id: number) {
    const parentCategory = await prisma.parentCategory.delete({
      where: {
        id: id,
      },
    });
    return parentCategory;
  }
}
export default new ParentCategory();
