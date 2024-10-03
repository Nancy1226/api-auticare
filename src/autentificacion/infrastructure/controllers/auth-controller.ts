import { Request, Response } from 'express';
import { LoginUseCase } from '../../application/login-usecase';
import { LogoutUseCase } from '../../application/logout-usecase';

export class AuthController {
  constructor(
    private loginUseCase: LoginUseCase,
    private logoutUseCase: LogoutUseCase
  ) {}

  async login(req: Request, res: Response): Promise<Response> {
    const { correo, contrasena } = req.body;
    try {
      const token = await this.loginUseCase.execute(correo, contrasena);
      return res.status(200).json({ correo, token });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async logout(req: Request, res: Response): Promise<Response> {
    await this.logoutUseCase.execute();
    return res.status(200).json({ message: "Logged out successfully" });
  }



  // async logout(req: Request, res: Response): Promise<Response> {
  //   const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del encabezado Authorization
  //   if (!token) {
  //     return res.status(400).json({ message: "Token not provided" });
  //   }
  //   await this.logoutUseCase.execute(token);
  //   return res.status(200).json({ message: "Logged out successfully" });
  // }
}
