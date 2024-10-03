import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import CreateEspecialistaUseCase from '../../application/create-especialista-usecase';
import GetEspecialistaListUseCase from '../../application/get-especialistaList-usecase';
import { GetEspecialistaByID } from '../../application/get-especialistaById-usecase';
import UpdateEspecialistaUseCase from '../../application/update-especialista-usecase';
import DeleteEspecialistaUseCase from '../../application/delete-especialista-usecase';
import { SendVerificationCodeUseCase } from '../../application/send-verification-code-usecase';

class EspecialistaController {
  // private verifyEspecialistaCodeUseCase: VerifyEspecialistaCodeUseCase;
  private verificationCodes: Map<string, string> = new Map();

  constructor(
    private getEspecialistaListUseCase: GetEspecialistaListUseCase,
    private createEspecialistaUseCase: CreateEspecialistaUseCase,
    private getEspecialistaByID: GetEspecialistaByID,
    private updateEspecialistaUseCase: UpdateEspecialistaUseCase,
    private deleteEspecialistaUseCase: DeleteEspecialistaUseCase,
    private sendVerificationCodeUseCase: SendVerificationCodeUseCase
  ) {
    // this.verifyEspecialistaCodeUseCase = verifyEspecialistaCodeUseCase;
  }

// Método para enviar el código de verificación
async sendVerification(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
      const { telefono } = req.body;
      const uuid = uuidv4(); // Generar un UUID para el registro

      // Generar y enviar el código
      const verificationCode = await this.sendVerificationCodeUseCase.execute(telefono);
      console.log(`UUID: ${uuid} - Enviando código ${verificationCode} a ${telefono}`);

      // Almacenar el código en memoria (opcional)
      this.verificationCodes.set(telefono, verificationCode);

      res.status(200).json({ message: 'Código de verificación enviado' });
  } catch (error) {
      next(error);
  }
}



  async verifyCode(req: Request, res: Response, next: NextFunction): Promise<Response> {
    // try {
    //   const { telefono, codigo } = req.body;

    //   // Recuperar el código real que se generó anteriormente (almacenado temporalmente en memoria)
    //   const actualCode = this.verificationCodes.get(telefono);

    //   if (!actualCode) {
    //     return res.status(400).json({ message: 'Código no encontrado o expirado' });
    //   }

    //   // Usar el caso de uso para verificar el código proporcionado
    //   const isValid = await this.verifyEspecialistaCodeUseCase.execute(codigo, actualCode);

    //   if (!isValid) {
    //     return res.status(400).json({ message: 'Código de verificación incorrecto' });
    //   }

    //   // Si el código es válido, proceder con la operación
    //   return res.status(200).json({ message: 'Verificación exitosa' });
    // } catch (error) {
    //   // Type assertion para error
    //   const errorMessage = (error as Error).message || 'Error desconocido';
    //   return res.status(500).json({ message: 'Error en el servidor', error: errorMessage });
    // }

    try {
      const { telefono, codigo, especialistaPayload } = req.body;
  
      // Recuperar el código generado anteriormente (almacenado temporalmente en memoria)
      const actualCode = this.verificationCodes.get(telefono);
  
      if (!actualCode) {
        return res.status(400).json({ message: 'Código no encontrado o expirado' });
      }
  
      // Verificar el código proporcionado
      const isValid = codigo === actualCode;
  
      if (!isValid) {
        return res.status(400).json({ message: 'Código de verificación incorrecto' });
      }
  
      // Si el código es válido, crear el especialista
      const hashedPassword = await bcrypt.hash(especialistaPayload.contrasena, 10);
      especialistaPayload.contrasena = hashedPassword;
  
      const especialista = await this.createEspecialistaUseCase.execute(especialistaPayload);
  
      return res.status(201).json(especialista);
    } catch (error) {
      const errorMessage = (error as Error).message || 'Error desconocido';
      return res.status(500).json({ message: 'Error en el servidor', error: errorMessage });
    }

  }


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
