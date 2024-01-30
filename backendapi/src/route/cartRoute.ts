import { Router } from "express";
import { getProfile, updateProfile } from "../controller/userController";
import { isAuthenticatedUser } from "../middleware/auth";
import { addProductToCart, createCart, getCart } from "../controller/cartController";

const router = Router();

//Profile Update, Get profile

router.get("/", isAuthenticatedUser, getCart);
router.post("/", isAuthenticatedUser, createCart);
router.post("/addProduct", isAuthenticatedUser, addProductToCart);



export default router;
