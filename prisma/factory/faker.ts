import { faker } from '@faker-js/faker';
export function categoryWithoutParentFactory() {
  const name = faker.commerce.department();
  const description = faker.commerce.productDescription();
  const slug = faker.helpers.slugify(name);
  const status = 'active';

  return {
    name,
    description,
    slug,
    status,
  };
}

export function categoryFactory() {
  const hasParentCategory = faker.datatype.boolean();
  const category = hasParentCategory
    ? categoryWithoutParentFactory()
    : categoryWithoutParentFactory();
  const parentCategory = hasParentCategory ? parentCategoryFactory() : null;
  const parentId = parentCategory ? parentCategory.id : null;

  return {
    ...category,
    parentId,
  };
}

export function parentCategoryFactory() {
  const id = faker.number.int({ min: 1, max: 1000 });
  const name = faker.commerce.department();
  const description = faker.commerce.productDescription();
  const slug = faker.helpers.slugify(name);
  const status = 'active';
  const numCategories = faker.number.int({ min: 0, max: 5 });
  const categories = Array.from({ length: numCategories }).map(() =>
    categoryWithoutParentFactory()
  );

  return {
    name,
    description,
    slug,
    status,
    categories,
    id,
  };
}

export function productFactory() {
  const name = faker.commerce.productName();
  const description = faker.commerce.productDescription();
  const slug = faker.helpers.slugify(name);
  const status = 'active';
  const category = categoryFactory();
  const categoryId = category.id;
  const markedPrice = parseFloat(faker.commerce.price(10, 1000, 2,"Rs"));
  const discount = faker.number.int({ min: 0, max: 50 });
  const totalStocks = faker.number.int({ min: 10, max: 1000 });
  const details = faker.lorem.paragraph();
  const additionalInformation = faker.lorem.paragraphs();

  return {
    name,
    description,
    slug,
    status,
    category,
    categoryId,
    markedPrice,
    discount,
    totalStocks,
    details,
    additionalInformation,
  };
}

export function mediaFactory() {
  const name = faker.system.fileName();
  const url = faker.internet.url();
  const alt = faker.lorem.sentence();
  const type = faker.system.fileExt();

  // Generate a random product, category, or parentCategory for the media
  const mediaType = faker.helpers.arrayElement([
    'product',
    'category',
    'parentCategory',
    null,
  ]);

  let product: any = null;
  let category: any = null;
  let parentCategory: any = null;
  let productId: any = null;
  let categoryId: any = null;
  let parentCategoryId: any = null;
  let userId: any = null;

  switch (mediaType) {
    case 'product':
      product = productFactory();
      productId = product.id;
      break;
    case 'category':
      category = categoryFactory();
      categoryId = category.id;
      break;
    case 'parentCategory':
      parentCategory = parentCategoryFactory();
      parentCategoryId = parentCategory.id;
      break;
    default:
      userId = faker.datatype.uuid();
      break;
  }

  return {
    name,
    url,
    alt,
    type,
    product,
    productId,
    category,
    categoryId,
    parentCategory,
    parentCategoryId,
    userId,
  };
}
