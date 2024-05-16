import { NextFunction, Request, Response, Router } from 'express';
import userController from '../controllers/userController';
import { body, validationResult } from 'express-validator';
const router = Router();

const loginValidation = [
  body('email').not().isEmpty().isEmail().withMessage('Email is required'),
  body('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }
    next();
  },
];
const registerValidation = [
  body('name').not().isEmpty().withMessage('Name is required'),
  body('email').not().isEmpty().isEmail().withMessage('Email is required'),
  body('password').trim().not().isEmpty().isLength({ min: 6 }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }
    next();
  },
];

router.post('/login', loginValidation, userController.login);
router.post('/register', registerValidation, userController.register);
const authRoutes = router;

export default authRoutes;
