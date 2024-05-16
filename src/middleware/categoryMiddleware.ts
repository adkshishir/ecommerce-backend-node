import { body, validationResult } from 'express-validator';
import isAdmin from './adminMiddleware';
import { NextFunction, Request, Response } from 'express';

const categoryMiddleware = [
  body('name').not().isEmpty().isString().withMessage('Name is required'),
  body('description').not().isEmpty().withMessage('Description is required'),
  body('slug').not().isEmpty().withMessage('Slug is required'),
  body('parentId').not().isEmpty().withMessage('Parent category is required'),

  // Authorization check
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check if user is admin
      isAdmin(req, res, next);
      // If isAdmin passes, continue to validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
      }

      next();
    } catch (error) {
      // Handle any errors
      console.error('Error in category middleware:', error);
      return res.status(500).json({
        success: false,
        error: error || 'Internal server error during validation',
      });
    }
  },
];
export default categoryMiddleware;
