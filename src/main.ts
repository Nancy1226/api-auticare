import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

import { authRouter } from "./autentificacion/infrastructure/routes/auth-router";
import { config } from "./config";
import { donacionRouter } from "./donacion/infrastructure/routes/donacion-router";
import { especialistaRouter } from "./especialista/infrastructure/routes/especialista-router";
import { notificationRouter } from "./notificaciones/infrastructure/routes/notification-routes";
import { tutorRouter } from "./tutor/infrastructure/routes/tutor-router";

function boostrap() {
  const app = express();

  app.use(bodyParser.json());
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/tutores", tutorRouter);
  app.use("/api/v1/especialistas", especialistaRouter);
  app.use("/api/v1/notificaciones", notificationRouter);
  app.use("/api/v1/donaciones", donacionRouter);

  const { port } = config.server;

  app.listen(port, () => {
    console.log(`[APP] - Starting application on port ${port}`);
  });
}

boostrap();
