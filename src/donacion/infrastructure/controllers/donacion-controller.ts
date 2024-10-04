import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import SaveDonacionUseCase from '../../application/save-donacion-usecase';
import CreateDonacionUseCase from '../../application/create-donation-usecase';
import GetDonacionListUseCase from '../../application/get-donacionList-usecase';

class DonacionController {
  constructor(
    private saveDonacionUseCase: SaveDonacionUseCase,
    private createDonacionUseCase: CreateDonacionUseCase,
    private getDonacionListUseCase: GetDonacionListUseCase
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { monto } = req.body;
      const result = await this.createDonacionUseCase.execute(monto);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async save(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { payment_id, status, amount } = req.query;
      const uuid = uuidv4();
      console.log("Llegando en query: " + req.query);

      const dataPago = {
        uuid: uuid,
        id_pago: payment_id as string,
        cantidad: parseFloat(amount as string),
        moneda: 'MXN',
        estado_pago: status as string
      };

      const donacion = await this.saveDonacionUseCase.execute(dataPago);
      res.status(201).json(donacion);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const donaciones = await this.getDonacionListUseCase.execute();
      res.json(donaciones);
    } catch (error) {
      next(error);
    }
  }
  
}

export default DonacionController;
