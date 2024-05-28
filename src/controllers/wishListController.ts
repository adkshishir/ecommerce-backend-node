import { NextFunction } from 'express';
import getUser from '../middleware/userMiddleware';
import WishList from '../models/WishList';

class wishlistController {
  async store(req: any, res: any, next: NextFunction) {
    try {
      const get = await getUser(req, res, next);
      if (get?.id) {
        const wishlist = await WishList.store({
          productId: req.body.productId,
          userId: get.id,
        });
        return res.status(201).json({ success: true, data: wishlist });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: error || 'Internal server error' });
    }
  }

  async delete(req: any, res: any) {
    try {
      const id = req.params.id;
      const wishlist = await WishList.delete(Number(id));
      if (!wishlist) {
        return res
          .status(404)
          .json({ success: false, error: 'No wishlist found' });
      }
      return res.status(200).json({ success: true, data: wishlist });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: error || 'Internal server error' });
    }
  }
  async userWishList(req: any, res: any) {
    try {
      const id = req.params.id;
      const wishlist = await WishList.getByUserId(id);
      if (!wishlist) {
        return res
          .status(404)
          .json({ success: false, error: 'No wishlist found' });
      }
      return res.status(200).json({ success: true, data: wishlist });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: error || 'Internal server error' });
    }
  }
}
export default new wishlistController();
