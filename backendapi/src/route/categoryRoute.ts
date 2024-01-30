import { Router } from "express";
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth";
import { addCategory, getAllCategories, updateCategory } from "../controller/categoryController";

const router = Router();

router.get('/', getAllCategories)
router.post('/', isAuthenticatedUser, authorizeRoles("admin", "manager"), addCategory)
router.put('/', isAuthenticatedUser, authorizeRoles("admin", "manager"), updateCategory)


export default router;
