// CONTIENE LA INSTANCIA DE TODAS LAS DEPENDENCIAS QUE SE ESTARAN UTILIZANDO
import CreateUserUseCase from "../application/create-user-usecase";
import GetUserListUseCase from "../application/get-userlist-usecase";
import { MySQLUserRepository } from "./mysql-user-repository";
import UserController from "./user-controller";

const mySqlUserRepository = new MySQLUserRepository(); // Esta implemeta el userRepository que necesita el caso de uso

export const getUserListUseCase = new GetUserListUseCase(
  mySqlUserRepository
); //TODO: Instancia del Caso de Uso - Se le pasa el user-repository que necesita

export const createUserUseCase = new CreateUserUseCase(
  mySqlUserRepository
);

export const userController = new UserController(getUserListUseCase, createUserUseCase); // Dependencia de controller que necesita que le llegue el welcomeEmailSender
// ya para poder invocar este caso de uso desde la ruta
