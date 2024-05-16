import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import {
  parentCategoryFactory,
  productFactory,
  categoryFactory,
  mediaFactory,
} from '../factory/faker';
async function main() {
  // Seed ParentCategories
  let parentCategoriesToCreate = Array.from({ length: 10 }).map(() =>
    parentCategoryFactory()
  );
  const createdParentCategories = await prisma.parentCategory.createMany({
    data: parentCategoriesToCreate,
  });
  console.log(`Created ${createdParentCategories.count} parent categories.`);

  // Seed Categories
  parentCategoriesToCreate = Array.from({ length: 50 }).map(() =>
    categoryFactory()
  );
  const createdCategories = await prisma.category.createMany({
    data: parentCategoriesToCreate,
  });
  console.log(`Created ${createdCategories.count} categories.`);

  // Seed Products
  const productsToCreate = Array.from({ length: 100 }).map(() =>
    productFactory()
  );
  const createdProducts = await prisma.product.createMany({
    data: productsToCreate,
  });
  console.log(`Created ${createdProducts.count} products.`);

  // Seed Media
  const mediaToCreate = Array.from({ length: 200 }).map(() => mediaFactory());
  const createdMedia = await prisma.media.createMany({
    data: mediaToCreate,
  });
  console.log(`Created ${createdMedia.count} media.`);

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    // process.exit(1);
  });
