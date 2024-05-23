import { NextFunction, Request, Response } from 'express';
import Category from '../models/Category';
import isAdmin from '../middleware/adminMiddleware';
import Media from '../models/Media';
import { url } from 'inspector';

class categoryController {
  async index(req: Request, res: Response) {
    try {
      const categories = await Category.getAll();
      if (!categories) {
        return res
          .status(404)
          .json({ success: false, error: 'No category found' });
      }
      return res.status(200).json({ success: true, data: categories });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: error || 'Internal Server Error' });
    }
  }
  async create(req: Request, res: Response) {
    try {
      const { name, description, slug, parentId, alt } = req.body;
      const img: any = req.file;
      const category = await Category.store({
        name,
        description,
        slug,
        parentId: Number(parentId),
      });
      // save image to the database
      const imageData: any = await Media.store({
        name: img.originalname,
        url:
          req.protocol +
          '://' +
          req.get('host') +
          '/images/' +
          img.originalname,
        alt,
        type: 'category',
        categoryId: category.id,
      });

      return res
        .status(200)
        .json({ success: true, data: category, imageUrl: imageData.url });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: error || 'Internal Server Error' });
    }
  }
  async show(req: Request, res: Response) {
    const slug = req.params.slug;
    try {
      const category = await Category.getBySlug(slug);
      if (!category) {
        return res
          .status(404)
          .json({ success: false, error: 'No category found' });
      }
      return res.status(200).json({ success: true, data: category });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: error || 'Internal Server Error' });
    }
  }
  async update(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const { name, description, slug, parentId, alt } = req.body;
      const img: any = req.file;
      const category = await Category.update(Number(id), {
        name,
        description,
        slug,
        parentId: Number(parentId),
      });
      const imageData: any = await Media.store({
        name: img.originalname,
        url:
          req.protocol +
          '://' +
          req.get('host') +
          '/images/' +
          img.originalname,
        alt,
        type: 'category',

        categoryId: category.id,
      });
      return res.status(200).json({ success: true, data: category });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: error || 'Internal Server Error' });
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    isAdmin(req, res, next);
    const id = req.params.id;
    try {
      const category = await Category.delete(Number(id));
      return res.status(200).json({ success: true, data: category });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: error || 'Internal Server Error' });
    }
  }
}

export default new categoryController();
