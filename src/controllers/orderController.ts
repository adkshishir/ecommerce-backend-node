import { NextFunction, Request, Response } from 'express';
import Order from '../models/Order';
import getUser from '../middleware/userMiddleware';
class OrderController {
  // get all orders
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await Order.getAll();
      return res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  // get user orders
  async getByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      // get user
      const user = await getUser(req, res, next);
      const id = user?.id;
      const orders = await Order.getByUserId(id);
      return res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const order = await Order.store(data);
      return res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const order = await Order.getById(Number(id));
      return res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const data = req.body;
      const order = await Order.update(Number(id), data);
      return res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const order = await Order.delete(Number(id));
      return res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }
}

export default new OrderController();