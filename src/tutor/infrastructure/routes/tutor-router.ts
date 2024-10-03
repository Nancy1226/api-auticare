import express from "express";

import { tutorController } from "../dependencies";
import { authMiddleware } from "../../../autentificacion/infrastructure/middleware/auth-middleware";

const tutorRouter = express.Router();

tutorRouter.post("/", tutorController.create.bind(tutorController)); 

tutorRouter.use(authMiddleware())
tutorRouter.get("/", tutorController.getAll.bind(tutorController)); 
tutorRouter.get("/:id", tutorController.getById.bind(tutorController))
tutorRouter.put('/:id', tutorController.update.bind(tutorController));
tutorRouter.delete('/:id', tutorController.delete.bind(tutorController));

export { tutorRouter }; 
