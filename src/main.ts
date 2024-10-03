import dotenv from 'dotenv';
import bodyParser from "body-parser";
import express from "express";
dotenv.config();

import { config } from "./config";
import { authRouter } from './autentificacion/infrastructure/routes/auth-router';
import { tutorRouter } from './tutor/infrastructure/routes/tutor-router';
import { especialistaRouter } from './especialista/infrastructure/routes/especialista-router';

function boostrap() {
  const app = express();

  app.use(bodyParser.json());
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/tutores", tutorRouter);
  app.use("/api/v1/especialistas", especialistaRouter);

  const { port } = config.server;

  app.listen(port, () => {
    console.log(`[APP] - Starting application on port ${port}`);
  });
}

boostrap();