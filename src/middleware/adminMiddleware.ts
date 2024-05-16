import * as jwt from 'jsonwebtoken';

const isAdmin = (req: any, res: any, next: any) => {
  const authHeader = req.header('Authorization');
  let token = authHeader && authHeader.split(' ')[1];

  try {
    if (!token) {
      res.status(401).json({ success: false, error: 'No token provided' });
    }
    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: any, user: any) => {
        if (err) {
          return res
            .status(401)
            .json({ success: false, error: 'Invalid token' });
        }
        req.user = user;
        if (user.role !== 'admin') {
          res.status(401).json({ success: false, error: 'Unauthorized' });
        }
      }
    );
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
};

export const adminMiddleware = [
  (req: any, res: any, next: any) => {
    isAdmin(req, res, next);
  },
];
export default isAdmin;
