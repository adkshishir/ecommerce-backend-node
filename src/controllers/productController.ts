import { NextFunction, Request, Response } from 'express';
import Product from '../models/Product';
import Media from '../models/Media';
import isAdmin from '../middleware/adminMiddleware';

type productType = {
  name: string;
  description: string;
  slug: string;
  status: string;
  categoryId: number;
  markedPrice: number;
  discount: number;
  details: string;
  additionalInformation: string;
  totalStocks: number;
};

class productController {
  async index(req: Request, res: Response) {
    try {
      const products = await Product.getAll();
      if (!products) {
        return res
          .status(404)
          .json({ success: false, error: 'No product found' });
      }
      return res.status(200).json({ success: true, data: products });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        error: error.message || 'Internal Server Error',
      });
    }
  }
  async store(req: Request, res: Response) {
    let productData: productType = req.body;
    productData = {
      slug: productData.slug,
      status: productData.status,
      details: productData.details,
      additionalInformation: productData.additionalInformation,
      name: productData.name,
      description: productData.description,
      categoryId: Number(productData.categoryId),
      markedPrice: Number(productData.markedPrice),
      discount: Number(productData.discount),
      totalStocks: Number(productData.totalStocks),
    };
    const product = await Product.store(productData);
    const alt = req.body.alt;
    const image = await Media.store({
      name: 'product',
      url:
        req.protocol +
        '://' +
        req.get('host') +
        '/images/' +
        req.file?.originalname,
      alt: alt,
      type: 'product',
      productId: product.id,
    });
    return res
      .status(200)
      .json({ success: true, data: product, imageUrl: image?.url });
  }
  async show(req: Request, res: Response) {
    const slug = req.params.slug;
    const product = await Product.getBySlug(slug);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: 'No product found' });
    }
    return res.status(200).json({ success: true, data: product });
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;
    const productData = req.body;
    const alt = req.body.alt;
    const product = await Product.update(Number(id), {
      name: productData.name,
      description: productData.description,
      slug: productData.slug,
      status: productData.status,
      categoryId: Number(productData.categoryId),
      markedPrice: Number(productData.markedPrice),
      discount: Number(productData.discount),
      details: productData.details,
      additionalInformation: productData.additionalInformation,
      totalStocks: Number(productData.totalStocks),
    });
    const image = await Media.store({
      name: 'product',
      url:
        req.protocol +
        '://' +
        req.get('host') +
        '/images/' +
        req.file?.originalname,
      alt: alt,
      type: 'product',
      productId: product.id,
    });
    return res
      .status(200)
      .json({ success: true, data: product, imageUrl: image?.url });
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    isAdmin(req, res, next);
    const id = req.params.id;
    const product = await Product.delete(Number(id));
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: 'No product found' });
    }
    return res.status(200).json({ success: true, data: product });
  }
}
export default new productController();
