import express from "express";

import { userController } from "./dependencies";

const userRouter = express.Router();

// ruta: /id/operacion que se esta ejecutando
userRouter.post("/:id/welcome", userController.run.bind(userController)); // Cuando se ejecute este caso de uso queremos que se ejecute el metodo run(que envia email) del userController

export { userRouter }; // Exporta para crear nueva ruta en el main.ts
