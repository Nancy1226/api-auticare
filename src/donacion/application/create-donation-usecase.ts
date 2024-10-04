// import { DonacionRepository } from '../domain/donacion-repository';
// import { Donacion } from '../domain/donacion';
import { MercadoPagoService } from '../domain/mercadopago-service';
// import { v4 as uuidv4 } from 'uuid';

class CreateDonacionUseCase {
  constructor(
    private mercadoPagoService: MercadoPagoService
  ) {}

  async execute(amount: number): Promise<{ init_point: string | undefined }> {
    const paymentResult = await this.mercadoPagoService.createPayment(amount, "Donación");
    
    return {
      init_point: paymentResult.init_point
    };
  }
}

export default CreateDonacionUseCase;