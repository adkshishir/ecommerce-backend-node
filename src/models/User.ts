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
}
export default new User();
