
import { Router } from 'express';
import cartController from '../controllers/cartController';
import cartMiddleware from '../middleware/cartMiddleware';
const router = Router();

router.get('/',cartController.getUserCart);
router.post('/', cartMiddleware, cartController.addToCart);
router.put('/:id', cartMiddleware, cartController.updateCart);
router.get('/:id', cartController.getCartById);
router.delete('/:id', cartController.deleteCartById);
router.delete('/user', cartController.deleteUserCart);

const cartRoutes = router;
export default cartRoutes;