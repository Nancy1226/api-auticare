import { VerificationRepository } from '../domain/verification-repository';
import { IMessagingService } from '../domain/services/IMessagingService';
import { Verification } from '../domain/verification';

export class SendVerificationCodeUseCase {
  constructor(
    private verificacionRepository: VerificationRepository,
    private messagingService: IMessagingService
  ) {}

  async execute(id:number | null,uuid: string, phoneNumber: string): Promise<void> {
    const verificationCode = this.generateVerificationCode();
    
    // Enviar código al teléfono del especialista
    await this.messagingService.sendVerificationCode(phoneNumber, verificationCode);

    // Guardar en la base de datos
    const verification = new Verification(id, uuid, phoneNumber, verificationCode, new Date());
    await this.verificacionRepository.create(verification);
  }

  private generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
