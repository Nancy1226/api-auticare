import axios from 'axios';
import { IMessagingService } from '../../domain/services/IMessagingService';


export class WhatsAppMessagingAdapter implements IMessagingService {
  
    async sendVerificationCode(phoneNumber: string, verificationCode: string): Promise<void> {
        console.log(`Enviando código ${verificationCode} a ${phoneNumber} a través de WhatsApp`);
        const message = `Tu código de verificación es: ${verificationCode}`;

        try {
            await this.sendMessageToWhatsApp(phoneNumber, message);
        } catch (error) {
            console.error('Error al enviar el código de verificación:', error);
            throw new Error('No se pudo enviar el código de verificación');
        }
    }

    private async sendMessageToWhatsApp(phoneNumber: string, message: string): Promise<void> {
        const url = 'https://graph.facebook.com/v20.0/399597039911387/messages';
        const data = {
            messaging_product: 'whatsapp',
            to: phoneNumber,
            type: 'template',
            template: {
                name: 'hello_world',
                language: { code: 'en_US' }
            }
        };
        
        try {
            const response = await axios.post(url, data, {
                headers: {
                    Authorization: `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Mensaje enviado: ', response.data);
    
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error al enviar el mensaje: ', error.response?.data || error.message);
            } else {
                console.error('Error inesperado: ', error);
            }
            throw error; // Re-lanza el error para que sea manejado por el llamador
        }
    }
}