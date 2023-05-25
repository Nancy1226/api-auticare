// INFRAESTRUTURA --> Donde se tendria el acoplamiento con el framework con el que se esta trabajando -> espress -> controller y router
import { Request, Response, NextFunction } from 'express';
import CreateUserUseCase from '../application/create-user-usecase';
import GetUserListUseCase from '../application/get-userlist-usecase';

class UserController {
  constructor(private getUserListUseCase: GetUserListUseCase, private createUserUseCase: CreateUserUseCase) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userPayload = req.body;
      const user = await this.createUserUseCase.execute(userPayload);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.getUserListUseCase.execute();
      res.json(users); // Enviar la respuesta JSON con los datos de usuarios
    } catch (error) {
      next(error);
    }
  }

}

export default UserController;
