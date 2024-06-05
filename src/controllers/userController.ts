import User from '../models/User';
import * as bcrypt from 'bcryptjs';
import { NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import getUser from '../middleware/userMiddleware';

class userController {
  async login(req: any, res: any) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ success: false, error: 'Email and password are required' });
      }
      const user = await User.getByEmail(email);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: 'User not found' });
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res
          .status(401)
          .json({ success: false, error: 'Invalid password' });
      }
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET as string,
        {
          expiresIn: '10d',
        }
      );
      return res.status(200).json({ success: true, data: { token } });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, error: error || 'Internal server error' });
    }
  }

  async register(req: any, res: any) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Name, email and password are required',
        });
      }
      const existingUser = await User.getByEmail(email);
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, error: 'User already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.store({
        name,
        email,
        password: hashedPassword,
      });
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET as string,

        {
          expiresIn: '10d',
        }
      );
      return res.status(200).json({ success: true, data: { token } });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, error: error || 'Internal server error' });
    }
  }
  async getProfile(req: any, res: any, next: NextFunction) {
    try {
      // get id from token
      const get = await getUser(req, res, next);
      if (get?.id) {
        const id = get.id;
        const user = await User.getProfile(id);
        return res.status(200).json({ success: true, data: user });
      } 
    } catch (error) {
    return res.status(500).json({ success: false, error: error });
    }
  }
}

export default new userController();
