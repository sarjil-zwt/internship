import { Router } from "express";
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth";
import { addProduct, getAllProducts, updateProduct } from "../controller/productController";

const router = Router();
router.get('/', getAllProducts)
router.post('/', isAuthenticatedUser, authorizeRoles("admin", "manager"), addProduct)
router.put('/update', isAuthenticatedUser, authorizeRoles("admin", "manager"), updateProduct)


export default router;
