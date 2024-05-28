import { Router } from 'express';
import wishListController from '../controllers/wishListController';

const router = Router();

router.post('/', wishListController.store);
router.delete('/:id', wishListController.delete);
router.get('/user', wishListController.userWishList);
const wishListRoutes = router;
export default wishListRoutes;
