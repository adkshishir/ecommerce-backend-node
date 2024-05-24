import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seedDatabase(
  userCount: number = 3,
  parentCategoryCount: number = 5,
  categoryCount: number = 5,
  mediaCount: number = 100,
  productVariantCount: number = 100,
  userDetailsCount: number = 100,
  orderCount: number = 100,
  paymentMethodCount: number = 10,
  orderItemCount: number = 100,
  contactCount: 30,
  couponCount: 20,
  cartCount: number = 1000,
  wishlistCount: number = 1000,
  reviewCount: number = 1000,
  productCount: number = 100
) {
  try {
    // Seed Users
    const users: any[] = [];
    for (let i = 0; i < userDetailsCount; i++) {
      users.push({
        name: faker.person.fullName(),
        role: faker.helpers.arrayElement(['admin', 'user', 'vendor']),
        email: faker.internet.email(),
        password: faker.internet.password(),
      });
    }
    users[0].role = 'admin';
    users[0].email = 'admin@gmail.com';
    users[0].password = '12345678';
    await prisma.user.createMany({ data: users });

    // Seed ParentCategories
    const parentCategories: any[] = [];
    for (let i = 0; i < parentCategoryCount; i++) {
      parentCategories.push({
        id: i + 1,
        name: faker.commerce.department(),
        description: faker.lorem.paragraph().slice(0, 100),
        slug: faker.lorem.slug(),
      });
    }
    await prisma.parentCategory.createMany({ data: parentCategories });

    // Seed Categories

    const categories: any[] = [];
    for (let i = 0; i < categoryCount; i++) {
      categories.push({
        name: faker.commerce.department(),
        description: faker.lorem.paragraph().slice(0, 100),
        slug: faker.lorem.slug(),
        parentId: faker.helpers.arrayElement([
          undefined,
          faker.number.int({ min: 1, max: parentCategoryCount }),
        ]), // Random parent category ID
      });
    }
    await prisma.category.createMany({ data: categories });

    const products: any[] = [];
    for (let i = 0; i < productCount; i++) {
      // get varient value according to type

      products.push({
        id: i + 1,
        name: faker.commerce.productName(),
        description: faker.lorem.paragraph().slice(0, 100),
        slug: faker.lorem.slug(),
        markedPrice: faker.number.int({ min: 50, max: 10000 }),
        discount: faker.number.int({ min: 0, max: 50 }),
        totalStocks: faker.number.int({ min: 10, max: 1000 }),
        details: faker.lorem.paragraph().slice(0, 100),
        additionalInformation: faker.lorem.paragraph().slice(0, 100),
        categoryId: faker.number.int({ min: 1, max: categoryCount - 4 }), // Random category ID
      });
    }
    await prisma.product.createMany({
      data: products,
    });
    const variants: any = [];
    for (let i = 0; i < productVariantCount; i++) {
      // get varient value according to type
      variants.push({
        additionalPrice: faker.number.int({ min: 0, max: 100 }),
        name: faker.commerce.productName(),
        type: faker.helpers.arrayElement(['color', 'size', 'weight', 'length']),
        value: faker.commerce.productMaterial(),
        stock: faker.number.int({ min: 10, max: 1000 }),
        productId: faker.number.int({ min: 1, max: productCount - 4 }),
      });
    }
    await prisma.variant.createMany({
      data: variants,
    });
    const media: any = [];
    for (let i = 0; i < mediaCount; i++) {
      // get varient value according to type
      media.push({
        name: faker.commerce.productName(),
        url: faker.image.urlLoremFlickr({ category: 'food' }),
        alt: faker.lorem.sentence(),
        type: faker.helpers.arrayElement([
          'category',
          'product',
          'parentCategory',
          'variant',
        ]),
        productId: faker.number.int({ min: 1, max: productCount - 4 }),
        categoryId: faker.number.int({ min: 1, max: categoryCount - 4 }),
        parentCategoryId: faker.number.int({
          min: 1,
          max: parentCategoryCount,
        }),
      });
    }
    await prisma.media.createMany({
      data: media,
    });

    // Add more seed data for other models...

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}
seedDatabase(
  3, // Number of users
  5, // Number of parent categories
  10, // Number of categories
  1000, // Number of media
  100, // Number of product variants
  50, // Number of user details
  100, // Number of orders
  10, // Number of payment methods
  100, // Number of order items
  30, // Number of contacts
  20, // Number of coupons
  1000, // Number of carts
  1000, // Number of wishlists
  1000, // Number of reviews
  500 // Number of products
);
