import { Router } from "express";
import AuthController from "../controllers/authControllers";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/refresh-token", AuthController.refreshToken);

export default router;