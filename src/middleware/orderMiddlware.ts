import { body, validationResult } from 'express-validator';
import isAdmin from './adminMiddleware';
import { NextFunction, Request, Response } from 'express';

const orderMiddleware = [
  body('status')
    .not()
    .isEmpty()
    .withMessage('Status is required')
    .isString()
    .withMessage('Status must be a string'),
  body('userId').not().isEmpty().withMessage('User id is required'),
  body('totalPrice')
    .not()
    .isEmpty()
    .withMessage('Total price is required')
    .isNumeric()
    .withMessage('Total price must be a number'),

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
      console.error('Error in order middleware:', error);
      return res.status(500).json({
        success: false,
        error: error || 'Internal server error during validation',
      });
    }
  },
];

export default orderMiddleware;
