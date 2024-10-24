import { v4 as uuidv4 } from "uuid";

import { Token } from "../domain/entities/token";
import { NotificationRepository } from "../domain/repositories/notification-repository";
import { IMessagingService } from "../domain/services/IMessagingService";

export class SendWhatsAppTokenUseCase {
  constructor(
    private notificationRepository: NotificationRepository,
    private messagingService: IMessagingService
  ) {}

  async execute(userId: number, phoneNumber: string): Promise<void> {
    const tokenValue = uuidv4(); // Genera un UUID como token
    const validAt = new Date(Date.now() + 3600 * 1000); // Le damos vigencia de 1 hora
    const newToken = new Token(
      null,
      tokenValue,
      validAt,
      userId,
      "habilitado",
      tokenValue
    );

    // Guardar el token en la base de datos
    await this.notificationRepository.saveToken(newToken);

    // Enviar el token por WhatsApp al usuario por medio de nuestra URL de verificacion
    const verificationUrl = tokenValue;
    // const verificationUrl = `${process.env.BASE_URL}/notificaciones/verificacion/${tokenValue}`;
    await this.messagingService.sendVerificationCode(
      phoneNumber,
      verificationUrl
    );
  }
}
