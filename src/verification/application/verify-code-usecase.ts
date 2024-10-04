import { Verification } from '../domain/verification'; // Asegúrate de que la ruta sea correcta
import { VerificationRepository } from '../domain/verification-repository';

export class VerifyCodeUseCase {
  constructor(private verificacionRepository: VerificationRepository) {}

  async execute(uuid: string, code: string): Promise<boolean> {
    const verification = await this.verificacionRepository.findByUuidAndCode(uuid, code);

    if (!verification) {
      return false; // Código incorrecto
    }

    // Si el código es válido, guardar en la base de datos
    await this.verificacionRepository.create(new Verification(
      null, // O el id si lo tienes
      uuid,
      verification.phoneNumber, // Usar el número de teléfono del registro
      verification.verificationCode, // Usar el código que se verifica
      new Date() // Fecha de creación
    ));

    return true; // Código válido
  }
}
