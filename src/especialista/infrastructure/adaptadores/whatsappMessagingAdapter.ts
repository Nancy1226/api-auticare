import { IMessagingService } from '../../domain/services/IMessagingService';
import axios from 'axios';

export class WhatsAppMessagingAdapter implements IMessagingService {
    async sendVerificationCode(phoneNumber: string, verificationCode: string): Promise<void> {
        // Aquí iría la lógica para interactuar con la API de WhatsApp
        // utilizando tu token y las credenciales de autenticación.
        console.log(`Enviando código ${verificationCode} a ${phoneNumber} a través de WhatsApp`);
        const message = `Tu código de verificación es: ${verificationCode}`;

        // Ejemplo de llamada a la API de WhatsApp (esto depende de la API que estés usando)
        await this.sendMessageToWhatsApp(phoneNumber, message);
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
            console.log('Message sent: ', response.data);
        } catch (error) {
            console.error('Error sending message: ', error);
        }
    }
    
}
