"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaFactory = exports.productFactory = exports.categoryFactory = exports.parentCategoryFactory = void 0;
var faker_1 = require("@faker-js/faker");
function parentCategoryFactory() {
    var name = faker_1.faker.commerce.department();
    var description = faker_1.faker.commerce.productDescription();
    var slug = faker_1.faker.helpers.slugify(name);
    var status = 'active';
    // Generate random number of categories (0 to 5)
    var numCategories = faker_1.faker.number.int({ min: 0, max: 5 });
    var categories = Array.from({ length: numCategories }).map(function () {
        return categoryFactory();
    });
    return {
        name: name,
        description: description,
        slug: slug,
        status: status,
        categories: categories,
    };
}
exports.parentCategoryFactory = parentCategoryFactory;
function categoryFactory() {
    var name = faker_1.faker.commerce.department();
    var description = faker_1.faker.commerce.productDescription();
    var slug = faker_1.faker.helpers.slugify(name);
    var status = 'active';
    // Generate a parent category for 50% of the categories
    var hasParentCategory = faker_1.faker.datatype.boolean();
    var parentCategory = hasParentCategory ? parentCategoryFactory() : null;
    var parentId = parentCategory ? parentCategory.id : null;
    return {
        name: name,
        description: description,
        slug: slug,
        status: status,
        parentId: parentId,
    };
}
exports.categoryFactory = categoryFactory;
function productFactory() {
    var name = faker_1.faker.commerce.productName();
    var description = faker_1.faker.commerce.productDescription();
    var slug = faker_1.faker.helpers.slugify(name);
    var status = 'active';
    var category = categoryFactory();
    var categoryId = category.id;
    var markedPrice = parseFloat(faker_1.faker.commerce.price(10, 1000, 2, "Rs"));
    var discount = faker_1.faker.number.int({ min: 0, max: 50 });
    var totalStocks = faker_1.faker.number.int({ min: 10, max: 1000 });
    var details = faker_1.faker.lorem.paragraph();
    var additionalInformation = faker_1.faker.lorem.paragraphs();
    return {
        name: name,
        description: description,
        slug: slug,
        status: status,
        category: category,
        categoryId: categoryId,
        markedPrice: markedPrice,
        discount: discount,
        totalStocks: totalStocks,
        details: details,
        additionalInformation: additionalInformation,
    };
}
exports.productFactory = productFactory;
function mediaFactory() {
    var name = faker_1.faker.system.fileName();
    var url = faker_1.faker.internet.url();
    var alt = faker_1.faker.lorem.sentence();
    var type = faker_1.faker.system.fileExt();
    // Generate a random product, category, or parentCategory for the media
    var mediaType = faker_1.faker.helpers.arrayElement([
        'product',
        'category',
        'parentCategory',
        null,
    ]);
    var product = null;
    var category = null;
    var parentCategory = null;
    var productId = null;
    var categoryId = null;
    var parentCategoryId = null;
    var userId = null;
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
            userId = faker_1.faker.datatype.uuid();
            break;
    }
    return {
        name: name,
        url: url,
        alt: alt,
        type: type,
        product: product,
        productId: productId,
        category: category,
        categoryId: categoryId,
        parentCategory: parentCategory,
        parentCategoryId: parentCategoryId,
        userId: userId,
    };
}
exports.mediaFactory = mediaFactory;
