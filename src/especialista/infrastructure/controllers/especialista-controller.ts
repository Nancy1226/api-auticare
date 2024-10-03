import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import CreateEspecialistaUseCase from '../../application/create-especialista-usecase';
import GetEspecialistaListUseCase from '../../application/get-especialistaList-usecase';
import { GetEspecialistaByID } from '../../application/get-especialistaById-usecase';
import UpdateEspecialistaUseCase from '../../application/update-especialista-usecase';
import DeleteEspecialistaUseCase from '../../application/delete-especialista-usecase';

class EspecialistaController {
  constructor(
    private getEspecialistaListUseCase: GetEspecialistaListUseCase,
    private createEspecialistaUseCase: CreateEspecialistaUseCase,
    private getEspecialistaByID: GetEspecialistaByID,
    private updateEspecialistaUseCase: UpdateEspecialistaUseCase,
    private deleteEspecialistaUseCase: DeleteEspecialistaUseCase
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      let especialistaPayload = req.body;
      const uuid = uuidv4(); // Generar el UUID
      const hashedPassword = await bcrypt.hash(especialistaPayload.contrasena, 10); // Cifrar la contraseña

      // Reemplazar la contraseña cifrada y agregar el UUID en el payload
      especialistaPayload = {
        ...especialistaPayload,
        uuid: uuid,
        contrasena: hashedPassword,
      };

      const especialista = await this.createEspecialistaUseCase.execute(especialistaPayload);
      res.status(201).json(especialista);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const especialista = await this.getEspecialistaListUseCase.execute();
      res.json(especialista);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const especialista = await this.getEspecialistaByID.run(req.params.id);
      res.json(especialista);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const especialistaId = req.params.id;
      const especialistaPayload = req.body;
      const updatedEspecialista = await this.updateEspecialistaUseCase.execute(especialistaId, especialistaPayload);
      res.json(updatedEspecialista);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const especialistaId = req.params.id;
      const result = await this.deleteEspecialistaUseCase.execute(especialistaId);
      res.status(result ? 200 : 404).json({ success: result });
    } catch (error) {
      next(error);
    }
  }
  
}

export default EspecialistaController;
