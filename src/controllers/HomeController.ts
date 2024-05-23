import { NextFunction, Request, Response } from 'express';
import Home from '../models/Home';
import Category from '../models/Category';
import ParentCategory from '../models/ParentCategory';
import { Product } from '@prisma/client';
import { searchQueryType } from './productController';

class HomeController {
  async menu(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    try {
      const menuData = await Home.getMenuData();
      if (!menuData) {
        return res
          .status(404)
          .json({ success: false, error: 'No menu data found' });
      }
      return res.status(200).json({ success: true, data: menuData });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: error || 'Internal Server Error' });
    }
  }
  async homePageData(req: Request, res: Response, next: NextFunction) {
    try {
      const popularProducts = await Home.topSellingProducts();
      const latestProducts = await Home.getLatestProducts();
      const categories = await Category.getAll();
      const parentCategories = await ParentCategory.getAll();
      const menuData = await Home.getMenuData();
      const specialCategories = await Home.getSpecialCategories();
      if (!menuData) {
        console.log('menuData not found');
        return res
          .status(404)
          .json({ success: false, error: 'No menu data found' });
      }
      return res.status(200).json({
        success: true,
        data: {
          popularProducts,
          latestProducts,
          menuData,
          categories,
          parentCategories,
          specialCategories,
        },
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: error || 'Internal Server Error' });
    }
  }
  async searchProduct(req: Request, res: Response, next: NextFunction) {
    const searchQuery: searchQueryType =
      req.query as unknown as searchQueryType;
    try {
      const products = await Home.searchProduct(searchQuery);
      if (!products) {
        return res
          .status(404)
          .json({ success: false, error: 'No products found' });
      }
      return res.status(200).json({ success: true, data: products });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: error || 'Internal Server Error' });
    }
  }
}

export default new HomeController();
