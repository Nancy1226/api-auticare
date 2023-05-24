// INFRAESTRUTURA --> Donde se tendria el acoplamiento con el framework con el que se esta trabajando -> espress -> controller y router
import { Request, Response } from "express";

import { WelcomeEmailSender } from "../application/welcome-email-sender"; // caso de uso

export class UserController {
  //TODO: Por inyeccion de dependencias se trae el UseCase
  constructor(private readonly welcomeEmailSender: WelcomeEmailSender) {}

  async run(req: Request, res: Response) {
    const userId = req.params.id; // Obtiene el ID
    await this.welcomeEmailSender.run(userId); // Ejecuta el caso de uso que envia email y le pasa el ID que necesita
    res.status(200).send();
  }
}
