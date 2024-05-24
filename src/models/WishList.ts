
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
class Wishlist {
    async store(data: any) {
        try {
            const wishlist = await prisma.wishlist.create({
                data: data,
            });
            return wishlist;
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
            });
            return wishlist;
        } catch (error) {
            throw error;
        }
    }
}

export default new Wishlist();