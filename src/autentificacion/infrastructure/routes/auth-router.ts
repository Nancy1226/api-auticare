import { Router } from "express";
import { authController } from "../auth-dependencies";

const authRouter = Router();
  
authRouter.post("/login", authController.login.bind(authController));
authRouter.post("/logout", authController.logout.bind(authController));

export { authRouter };
