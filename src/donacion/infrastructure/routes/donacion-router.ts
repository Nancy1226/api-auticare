import express from "express";
import { donacionController } from "../dependencies";
// import { authMiddleware } from "../../../autentificacion/infrastructure/middleware/auth-middleware";

const donacionRouter = express.Router();
 
// Rutas protegidas
// donacionRouter.use(authMiddleware()); 
donacionRouter.post("/", donacionController.create.bind(donacionController));
donacionRouter.get("/success", donacionController.save.bind(donacionController)); 
donacionRouter.get("/failure", (req, res) => res.send("Pago fallido")); 
donacionRouter.get("/pending", (req, res) => res.send("Pago pendiente")); 

donacionRouter.get("/", donacionController.getAll.bind(donacionController));

export { donacionRouter }; 
