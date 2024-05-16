import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import isAdmin from './adminMiddleware';

const productMiddleware = [
  body('name').not().isEmpty().withMessage('Name is required'),
  body('description').not().isEmpty().withMessage('Description is required'),

  body('status')
    .not()
    .isString()
    .withMessage('Status Must Be active or inactive'),
  body('categoryId').not().isEmpty().withMessage('Category is required'),
  body('markedPrice')
    .not()
    .isEmpty()
    .withMessage('Marked price is required')
    .isNumeric()
    .withMessage('Marked price must be a number'),
  body('discount').not().isEmpty().withMessage('Discount is required'),
  body('details').not().isEmpty().withMessage('Details is required'),
  body('additionalInformation')
    .not()
    .isEmpty()
    .withMessage('Additional information is required'),
  body('totalStocks')
    .not()
    .isEmpty()
    .withMessage('Total stocks must be a number'),
  (req: Request, res: Response, next: NextFunction) => {
    isAdmin(req, res, next);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }
    next();
  },
];

export default productMiddleware;
