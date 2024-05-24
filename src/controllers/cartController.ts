import { NextFunction, Request, Response } from 'express';
import getUser from '../middleware/userMiddleware';
import Cart, { cartType } from '../models/Cart';

class CartController {
  // get user cart
  async getUserCart(req: Request, res: Response, next: NextFunction) {
    try {
      const get = await getUser(req, res, next);
      if (get?.id) {
        const id = get.id;
        const cart = await Cart.getByUserId(id);
        if (!cart) {
          return res
            .status(404)
            .json({ success: false, error: 'Cart not found' });
        } else return res.status(200).json({ success: true, data: cart });
      }
    } catch (error) {
      throw error;
    }
  }

  async addToCart(req: Request, res: Response, next: NextFunction) {
    try {
      const get = await getUser(req, res, next);
      if (!get) {
        return res.status(401).json({ success: false, error: 'Unauthorized' });
      }
      const id = get.id;
      const data: cartType = req.body;
      const cart = await Cart.store({ ...data, userId: id });
      return res.status(200).json({ success: true, data: cart });
    } catch (error) {
      throw error;
    }
  }

  async updateCart(req: Request, res: Response, next: NextFunction) {
    try {
      const get = await getUser(req, res, next);
      if (!get) {
        return res.status(401).json({ success: false, error: 'Unauthorized' });
      }
      const id = req.params.id;
      const data: cartType = req.body;
      const cart = await Cart.update(Number(id), data);
      return res.status(200).json({ success: true, data: cart });
    } catch (error) {
      throw error;
    }
  }

  async deleteUserCart(req: Request, res: Response, next: NextFunction) {
    try {
      const get = await getUser(req, res, next);
      if (!get) {
        return res.status(401).json({ success: false, error: 'Unauthorized' });
      }
      const id = get.id;
      const cart = await Cart.deleteByUserId(id);
      return res.status(200).json({ success: true, data: cart });
    } catch (error) {
      throw error;
    }
  }

  async getCartById(req: Request, res: Response, next: NextFunction) {
    try {
      const get = await getUser(req, res, next);
      if (!get) {
        return res.status(401).json({ success: false, error: 'Unauthorized' });
      }
      const id = req.params.id;
      const cart = await Cart.getById(Number(id));
      return res.status(200).json({ success: true, data: cart });
    } catch (error) {
      throw error;
    }
  }

  async deleteCartById(req: Request, res: Response, next: NextFunction) {
    try {
      const get = await getUser(req, res, next);
      if (!get) {
        return res.status(401).json({ success: false, error: 'Unauthorized' });
      }
      const id = get.id;
      const cart = await Cart.delete(id);
      return res.status(200).json({ success: true, data: cart });
    } catch (error) {
      throw error;
    }
  }
}
export default new CartController();
