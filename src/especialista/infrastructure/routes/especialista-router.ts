import express from "express";
import { especialistaController } from "../dependencies";
import { authMiddleware } from "../../../autentificacion/infrastructure/middleware/auth-middleware";

const especialistaRouter = express.Router();

// Ruta para enviar el código de verificación al número de teléfono ingresado
especialistaRouter.post('/register/send-code', (req, res, next) => especialistaController.sendVerification(req, res, next));
especialistaRouter.post('/register/verify-code', (req, res, next) => especialistaController.verifyCode(req, res, next));

especialistaRouter.post("/", especialistaController.create.bind(especialistaController)); 

// Rutas protegidas
especialistaRouter.use(authMiddleware()); // Aplica el middleware solo en las siguientes rutas

especialistaRouter.get("/", especialistaController.getAll.bind(especialistaController)); 
especialistaRouter.get("/:id", especialistaController.getById.bind(especialistaController))
especialistaRouter.put('/:id', especialistaController.update.bind(especialistaController));
especialistaRouter.delete('/:id', especialistaController.delete.bind(especialistaController));

export { especialistaRouter }; 
