// CONTIENE LA INSTANCIA DE TODAS LAS DEPENDENCIAS QUE SE ESTARAN UTILIZANDO
import { WelcomeEmailSender } from "../application/welcome-email-sender";
import { InMemoryUserRepository } from "./in-memory-user-repository";
import { UserController } from "./user-controller";

const inMemoryUserRepository = new InMemoryUserRepository(); // Esta implemeta el userRepository que necesita el caso de uso

export const welcomeEmailSender = new WelcomeEmailSender(
  inMemoryUserRepository
); //TODO: Instancia del Caso de Uso - Se le pasa el user-repository que necesita

export const userController = new UserController(welcomeEmailSender); // Dependencia de controller que necesita que le llegue el welcomeEmailSender
// ya para poder invocar este caso de uso desde la ruta
