import parentCategoryController from '../controllers/parentCategoryController';

import { Router } from 'express';
import parentCategoryMiddleware from '../middleware/parentCategoryMiddleware';
import isAdmin from '../middleware/adminMiddleware';
import upload, { uploadWithMulter } from '../lib/Multer';
const router = Router();

router.get('/', parentCategoryController.index);
router.post(
  '/',
  uploadWithMulter,
  parentCategoryMiddleware,
  parentCategoryController.create
);
router.get('/:slug', parentCategoryController.show);
router.put(
  '/:id',
  uploadWithMulter,
  parentCategoryMiddleware,
  parentCategoryController.update
);
router.delete('/:id', parentCategoryController.delete);
const parentCategoryRoutes = router;

export default parentCategoryRoutes;
