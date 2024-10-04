import express from "express";
import { verificationController } from "../dependencies"; // Asegúrate de que este importe sea correcto

const verificationRouter = express.Router();

// Ruta para enviar el código de verificación al número de teléfono ingresado
verificationRouter.post('/register/send-code', (req, res, next) => verificationController.sendCode(req, res, next));
verificationRouter.post('/register/verify-code', (req, res, next) => verificationController.verifyCode(req, res, next));


export { verificationRouter };
