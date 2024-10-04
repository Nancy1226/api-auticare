declare module 'mercadopago' {
  export class MercadoPagoConfig {
    constructor(options: { accessToken: string });
  }

  export class Preference {
    constructor(client: MercadoPagoConfig);
    create(data: { body: any }): Promise<{
      id: string;
      init_point: string;
    }>;
  }
}