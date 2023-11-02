import { Router } from "express";
import userController from "../controllers/userController";
import { tokenValidationMiddleware } from "../middleware/authentication";
import UserSchema from "../schema/userSchema";

const router = Router();

router.post("/login", UserSchema, userController.login);
router.post("/register", UserSchema, userController.register);
router.get("/users", tokenValidationMiddleware, userController.users);

export default router;
