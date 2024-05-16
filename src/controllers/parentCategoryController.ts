import { NextFunction } from 'express';
import isAdmin from '../middleware/adminMiddleware';
import ParentCategory from '../models/ParentCategory';
import Media from '../models/Media';
class parentCategoryController {
  async index(req: any, res: any) {
    try {
      const parentCategories = await ParentCategory.getAll();
      if (!parentCategories) {
        return res
          .status(404)
          .json({ success: false, error: 'No parent category found' });
      }

      return res.status(200).json({ success: true, data: parentCategories });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  }
  async create(req: any, res: any) {
    try {
      const { name, description, slug, alt } = req.body;
      const img: any = req.file;
      const parentCategory = await ParentCategory.store({
        name,
        description,
        slug,
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
        type: 'parentCategory',
        parentCategoryId: parentCategory.id,
      });
      return res
        .status(200)
        .json({ success: true, data: parentCategory, imageUrl: imageData.url });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error || 'Internal server error during store in controller',
      });
    }
  }
  async show(req: any, res: any) {
    const slug = req.params.slug;
    try {
      const parentCategory = await ParentCategory.getBySlug(slug);
      if (!parentCategory) {
        return res
          .status(404)
          .json({ success: false, error: 'No parent category found' });
      }

      // const image=await  Media.getImage(parentCategory.id,'parentCategory')

      return res.status(200).json({ success: true, data: parentCategory });
    } catch (error: any) {
      res
        .status(500)
        .json({ success: false, error: error || 'Internal Server Error' });
    }
  }
  async update(req: any, res: any) {
    const id = req.params.id;
    try {
      const { name, description, slug, status, alt } = req.body;
      const img: any = req.file;
      const parentCategory = await ParentCategory.update(id, {
        name,
        description,
        slug,
        status,
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
        type: 'parentCategory',
        parentCategoryId: parentCategory.id,
      });
      return res.status(200).json({
        success: true,
        data: { ...parentCategory, imageUrl: imageData?.url },
      });
    } catch (error: any) {
      return res
        .status(500)
        .json({ success: false, error: error || 'Internal server error' });
    }
  }

  async delete(req: any, res: any, next: NextFunction) {
    const id = req.params.id;
    isAdmin(req, res, next);
    try {
      const parentCategory = await ParentCategory.delete(Number(id));
      return res.status(200).json({ success: true, data: parentCategory });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: error || 'Internal server error' });
    }
  }
}

export default new parentCategoryController();
