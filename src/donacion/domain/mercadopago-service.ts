export interface MercadoPagoService {
    createPayment(amount: number, description: string): Promise<PaymentResult>;
}

export interface PaymentResult {
    // status: 'Exitoso' | 'Pendiente' | 'Fallido';
    id: string | undefined;
    init_point: string | undefined;
  }