import { IMessagingService } from '../domain/services/IMessagingService';

export class SendVerificationCodeUseCase {
    private messagingService: IMessagingService;

    constructor(messagingService: IMessagingService) {
        this.messagingService = messagingService;
    }

    async execute(phoneNumber: string): Promise<string> {
        // 1. Generar el código de verificación
        const verificationCode = this.generateVerificationCode();

        // 2. Enviar el código por WhatsApp o SMS
        await this.messagingService.sendVerificationCode(phoneNumber, verificationCode);

        // 3. Retornar el código generado para que el cliente lo compare en la verificación
        return verificationCode;
    }

    private generateVerificationCode(): string {
        // Generar un código de verificación de 6 dígitos
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
}
