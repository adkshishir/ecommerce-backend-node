import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export type VarientDataType = {
  name: String;
  value: String;
  type: string;
  markedPrice: number;
  stock: number;
};
// class Varient {
//   async store(data: VarientDataType) {
//     try {
//       const varient = await prisma.variant.create({
//         data: data,
//       });
//       return varient;
//     } catch (error) {
//       throw error;
//     }
//   }
// }
