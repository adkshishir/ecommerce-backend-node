import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
type ImageDataType = {
  name: string;
  url: string;
  alt?: string;
  type: string;
  productId?: any;
  categoryId?: any;
  userId?: any;
  parentCategoryId?: any;
};

class Media {
  async getAll() {
    const images = await prisma.media.findMany({
      orderBy: {
        id: 'desc',
      }
    });
    return images;
  }

  async store(data: ImageDataType) {
    console.log(data)
    try {
      //   save the image using multer in the public images folder and then store it in the database
      const image = await prisma.media.create({
        data: data,
      });
      return image;
    } catch (error: any) {
      console.log(error.message)
      return null
    }
  }

  async update(id: number, data: any) {
    const image = await prisma.media.update({
      where: {
        id: id,
      },
      data: data,
    });
    return image;
  }
  async getImage(id: number, type: string) {
    try {
      const image = await prisma.media.findFirst({
        where: {
          id: Number(id),
          type: type,
        },
      });
      return image;
    } catch (error: any) {
      return null;
    }
  }

  async delete(id: number) {
    const image = await prisma.media.delete({
      where: {
        id: id,
      },
    });
    return image;
  }
}

export default new Media();
