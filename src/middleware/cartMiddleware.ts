import { body, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';

const cartMiddleware = [
  body('productId').not().isEmpty().withMessage('Description is required'),
  body('variantId').not().isEmpty().withMessage('Slug is required'),
  body('quantity').not().isEmpty().withMessage('Parent category is required'),

  // Authorization check
  (req: Request, res: Response, next: NextFunction) => {
    try {
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
export default cartMiddleware;
