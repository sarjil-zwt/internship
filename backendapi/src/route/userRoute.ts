import { Router } from "express";
import { getProfile, updateProfile } from "../controller/userController";
import { isAuthenticatedUser } from "../middleware/auth";

const router = Router();

//Profile Update, Get profile

router.get("/me", isAuthenticatedUser, getProfile);
router.put("/update", isAuthenticatedUser, updateProfile);


export default router;
