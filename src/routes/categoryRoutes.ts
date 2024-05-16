import categoryController from '../controllers/categoryController';

import { Router } from 'express';
import categoryMiddleware from '../middleware/categoryMiddleware';
import upload, { uploadWithMulter } from '../lib/Multer';
const router = Router();

router.get('/', categoryController.index);
router.post(
  '/',
  uploadWithMulter,
  categoryMiddleware,
  categoryController.create
);
router.get('/:slug', categoryController.show);
router.put(
  '/:id',
  uploadWithMulter,
  categoryMiddleware,
  categoryController.update
);
router.delete('/:id', categoryController.delete);
const categoryRoutes = router;

export default categoryRoutes;
