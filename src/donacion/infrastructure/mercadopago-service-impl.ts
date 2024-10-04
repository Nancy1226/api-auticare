import { MercadoPagoConfig, Preference } from 'mercadopago';
import { MercadoPagoService, PaymentResult } from '../domain/mercadopago-service';

export class MercadoPagoServiceImpl implements MercadoPagoService {
  private client: MercadoPagoConfig;

  constructor() {
    this.client = new MercadoPagoConfig({ 
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN as string 
    });
  }

  async createPayment(amount: number, description: string): Promise<PaymentResult> {
    const preference = new Preference(this.client);
    
    const preferenceData: any = {
      items: [{
        title: description,
        unit_price: amount,
        quantity: 1,
      }],
      back_urls: {
        success: `http://localhost:3000/api/v1/donaciones/success?amount=${amount}`,
        failure: "http://localhost:3000/api/v1/donaciones/failure",
        pending: "http://localhost:3000/api/v1/donaciones/pending"
      },
      auto_return: "approved" as const,
    //   notification_url: "http://localhost:3000/api/v1/donaciones/webhook",
    };

    const result = await preference.create({ body: preferenceData });
    
    return {
      id: result.id,
      init_point: result.init_point
    };
  }
}