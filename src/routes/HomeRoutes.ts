import { Router } from 'express';
import HomeController from '../controllers/HomeController';
const router = Router();

router.get('/menu', HomeController.menu);
router.get('/home-page-data', HomeController.homePageData);
router.get('/search-products', HomeController.searchProduct);
const homeRoutes = router;

export default homeRoutes;
    