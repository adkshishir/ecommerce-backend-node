"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var client_1 = require("@prisma/client");
var faker_1 = require("@faker-js/faker");
var prisma = new client_1.PrismaClient();
function seedDatabase(userCount, parentCategoryCount, categoryCount, mediaCount, productVariantCount, userDetailsCount, orderCount, paymentMethodCount, orderItemCount, contactCount, couponCount, cartCount, wishlistCount, reviewCount, productCount) {
    if (userCount === void 0) { userCount = 10; }
    if (parentCategoryCount === void 0) { parentCategoryCount = 7; }
    if (categoryCount === void 0) { categoryCount = 10; }
    if (mediaCount === void 0) { mediaCount = 100; }
    if (productVariantCount === void 0) { productVariantCount = 100; }
    if (userDetailsCount === void 0) { userDetailsCount = 100; }
    if (orderCount === void 0) { orderCount = 100; }
    if (paymentMethodCount === void 0) { paymentMethodCount = 10; }
    if (orderItemCount === void 0) { orderItemCount = 100; }
    if (cartCount === void 0) { cartCount = 1000; }
    if (wishlistCount === void 0) { wishlistCount = 1000; }
    if (reviewCount === void 0) { reviewCount = 1000; }
    if (productCount === void 0) { productCount = 100; }
    return __awaiter(this, void 0, void 0, function () {
        var users, i, parentCategories, i, categories, i, products, i, variants, i, media, i, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, 8, 10]);
                    users = [];
                    for (i = 0; i < userDetailsCount; i++) {
                        users.push({
                            name: faker_1.faker.person.fullName(),
                            role: faker_1.faker.helpers.arrayElement(['admin', 'user', 'vendor']),
                            email: faker_1.faker.internet.email(),
                            password: faker_1.faker.internet.password()
                        });
                    }
                    users[0].role = 'admin';
                    users[0].email = 'admin@gmail.com';
                    users[0].password = '12345678';
                    return [4 /*yield*/, prisma.user.createMany({ data: users })];
                case 1:
                    _a.sent();
                    parentCategories = [];
                    for (i = 0; i < parentCategoryCount; i++) {
                        parentCategories.push({
                            id: i + 1,
                            name: faker_1.faker.commerce.department(),
                            description: faker_1.faker.lorem.paragraph().slice(0, 100),
                            slug: faker_1.faker.lorem.slug()
                        });
                    }
                    return [4 /*yield*/, prisma.parentCategory.createMany({ data: parentCategories })];
                case 2:
                    _a.sent();
                    categories = [];
                    for (i = 0; i < categoryCount; i++) {
                        categories.push({
                            name: faker_1.faker.commerce.department(),
                            description: faker_1.faker.lorem.paragraph().slice(0, 100),
                            slug: faker_1.faker.lorem.slug(),
                            parentId: faker_1.faker.helpers.arrayElement([
                                undefined,
                                faker_1.faker.number.int({ min: 1, max: parentCategoryCount }),
                            ])
                        });
                    }
                    return [4 /*yield*/, prisma.category.createMany({ data: categories })];
                case 3:
                    _a.sent();
                    products = [];
                    for (i = 0; i < productCount; i++) {
                        // get varient value according to type
                        products.push({
                            id: i + 1,
                            name: faker_1.faker.commerce.productName(),
                            description: faker_1.faker.lorem.paragraph().slice(0, 100),
                            slug: faker_1.faker.lorem.slug(),
                            markedPrice: faker_1.faker.number.int({ min: 10, max: 1000 }),
                            discount: faker_1.faker.number.int({ min: 0, max: 50 }),
                            totalStocks: faker_1.faker.number.int({ min: 10, max: 1000 }),
                            details: faker_1.faker.lorem.paragraph().slice(0, 100),
                            additionalInformation: faker_1.faker.lorem.paragraph().slice(0, 100),
                            categoryId: faker_1.faker.number.int({ min: 1, max: categoryCount - 4 })
                        });
                    }
                    return [4 /*yield*/, prisma.product.createMany({
                            data: products
                        })];
                case 4:
                    _a.sent();
                    variants = [];
                    for (i = 0; i < productVariantCount; i++) {
                        // get varient value according to type
                        variants.push({
                            additionalPrice: faker_1.faker.number.int({ min: 0, max: 100 }),
                            name: faker_1.faker.commerce.productName(),
                            type: faker_1.faker.helpers.arrayElement(['color', 'size', 'weight', 'length']),
                            value: faker_1.faker.commerce.productMaterial(),
                            stock: faker_1.faker.number.int({ min: 10, max: 1000 }),
                            productId: faker_1.faker.number.int({ min: 1, max: productCount - 4 })
                        });
                    }
                    return [4 /*yield*/, prisma.variant.createMany({
                            data: variants
                        })];
                case 5:
                    _a.sent();
                    media = [];
                    for (i = 0; i < mediaCount; i++) {
                        // get varient value according to type
                        media.push({
                            name: faker_1.faker.commerce.productName(),
                            url: faker_1.faker.image.urlLoremFlickr({ category: 'fashion' }),
                            alt: faker_1.faker.lorem.sentence(),
                            type: faker_1.faker.helpers.arrayElement([
                                'category',
                                'product',
                                'parentCategory',
                                'variant',
                            ]),
                            productId: faker_1.faker.number.int({ min: 1, max: productCount - 4 }),
                            categoryId: faker_1.faker.number.int({ min: 1, max: categoryCount - 4 }),
                            parentCategoryId: faker_1.faker.number.int({
                                min: 1,
                                max: parentCategoryCount
                            })
                        });
                    }
                    return [4 /*yield*/, prisma.media.createMany({
                            data: media
                        })];
                case 6:
                    _a.sent();
                    // Add more seed data for other models...
                    console.log('Database seeded successfully');
                    return [3 /*break*/, 10];
                case 7:
                    error_1 = _a.sent();
                    console.error('Error seeding database:', error_1);
                    return [3 /*break*/, 10];
                case 8: return [4 /*yield*/, prisma.$disconnect()];
                case 9:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    });
}
seedDatabase(10, // Number of users
5, // Number of parent categories
20, // Number of categories
100, // Number of media
100, // Number of product variants
100, // Number of user details
100, // Number of orders
10, // Number of payment methods
100, // Number of order items
30, // Number of contacts
20, // Number of coupons
1000, // Number of carts
1000, // Number of wishlists
1000, // Number of reviews
1000 // Number of products
);
