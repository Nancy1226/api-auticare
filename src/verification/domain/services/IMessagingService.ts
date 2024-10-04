export interface IMessagingService {
    // Método para enviar el código de verificación a un número de teléfono
    sendVerificationCode(phoneNumber: string, verificationCode: string): Promise<void>;
  }
  