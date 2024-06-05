import { Router } from "express";
import orderController from "../controllers/orderController";
const router = Router();

router.get("/", orderController.getAll);
router.get("/user", orderController.getByUserId);
router.post("/", orderController.store);
router.get("/:id", orderController.getById);
router.put("/:id", orderController.update);
router.delete("/:id", orderController.delete);
const orderRoutes = router;
export default orderRoutes