import express from "express";

import { notificationController } from "../dependencies";

const notificationRouter = express.Router();

notificationRouter.post(
  "/verificacion/enviar",
  notificationController.sendVerification.bind(notificationController)
);
notificationRouter.get(
  "/verificacion/:token",
  notificationController.verifyToken.bind(notificationController)
);

export { notificationRouter };
