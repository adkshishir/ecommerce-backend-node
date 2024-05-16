import { Router } from 'express';
import productController from '../controllers/productController';
import productMiddleware from '../middleware/productMiddleware';
import { adminMiddleware } from '../middleware/adminMiddleware';
import upload, { uploadWithMulter } from '../lib/Multer';
const router = Router();

router.get('/', productController.index);
router.post('/', uploadWithMulter, productMiddleware, productController.store);
router.get('/:show', productController.show);
router.put(
  '/:id',
  uploadWithMulter,
  productMiddleware,
  productController.update
);
router.delete('/:id', productController.delete);
const productRoutes = router;
export default productRoutes;
