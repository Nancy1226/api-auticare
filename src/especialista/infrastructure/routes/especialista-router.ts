import express from "express";
import { especialistaController } from "../dependencies";
import { authMiddleware } from "../../../autentificacion/infrastructure/middleware/auth-middleware";

const especialistaRouter = express.Router();

especialistaRouter.post("/", especialistaController.create.bind(especialistaController)); 

// Rutas protegidas
especialistaRouter.use(authMiddleware()); // Aplica el middleware solo en las siguientes rutas

especialistaRouter.get("/", especialistaController.getAll.bind(especialistaController)); 
especialistaRouter.get("/:id", especialistaController.getById.bind(especialistaController))
especialistaRouter.put('/:id', especialistaController.update.bind(especialistaController));
especialistaRouter.delete('/:id', especialistaController.delete.bind(especialistaController));

export { especialistaRouter }; 
