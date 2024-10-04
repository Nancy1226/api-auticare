export interface IMessagingService {
    /**
     * Envía un código de verificación a través de un servicio de mensajería (como WhatsApp).
     * 
     * @param phoneNumber - El número de teléfono al cual se enviará el código.
     * @param verificationCode - El código de verificación que se enviará.
     * @returns Promise<void>
     */
    sendVerificationCode(phoneNumber: string, verificationCode: string): Promise<void>;
}
