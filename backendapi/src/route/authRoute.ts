import { Router } from "express";
import { loginUser, signupUser } from "../controller/userController";
import { authorizeRoles } from "../middleware/auth";

const router = Router();


const authorizeRolesArray: string[] = ["admin", "sasd"]

router.post("/login", loginUser);
router.post('/signup', signupUser)

export default router;
