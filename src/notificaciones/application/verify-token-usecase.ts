import { NotificationRepository } from "../domain/repositories/notification-repository";

export class VerifyTokenUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(token: string): Promise<boolean> {
    const foundToken = await this.notificationRepository.findByToken(token);

    if (!foundToken) {
      return false; // Token no encontrado
    }

    // Verificar si el token es válido y está dentro de su vigencia
    if (
      foundToken.status === "inhabilitado" ||
      new Date() > foundToken.validAt
    ) {
      return false;
    }

    // Actualizar el estado del token a "inhabilitado"
    await this.notificationRepository.updateTokenStatus(
      foundToken.id!,
      "inhabilitado"
    );

    // Actualizar el estado de verificación del usuario (verified_at)
    // Esto sería una llamada a tu UserRepository para marcar al usuario como verificado

    return true;
  }
}
