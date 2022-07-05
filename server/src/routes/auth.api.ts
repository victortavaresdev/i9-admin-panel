import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const authRouter = Router();

const authController = new AuthController();

authRouter.post("/register", authController.RegisterUserController);
authRouter.post("/login", authController.LoginUserController);
authRouter.post("/refresh-token", authController.RefreshTokenUserController);

export { authRouter };
