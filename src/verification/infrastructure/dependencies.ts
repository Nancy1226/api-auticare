import { WhatsAppMessagingAdapter } from '../infrastructure/adaptadores/whatsappMessagingAdapter';
import { SendVerificationCodeUseCase } from '../application/send-verification-code-usecase';
import { VerifyCodeUseCase } from '../application/verify-code-usecase';
import { RepositoryFactory } from "../infrastructure/repository-fractory"; // Asegúrate de que el nombre sea correcto
import { VerificationController } from './controllers/verification-controller';

// Crear la instancia del repositorio de verificación
const verificationFactoryRepository = RepositoryFactory.createVerificationRepository();

// Instanciar el servicio de mensajería
const messagingService = new WhatsAppMessagingAdapter(); // Usa el nombre correcto aquí

// Crear el caso de uso para enviar el código de verificación
export const sendVerificationCodeUseCase = new SendVerificationCodeUseCase(
    verificationFactoryRepository, // Asegúrate de que este argumento sea correcto
    messagingService // Pasa el servicio de mensajería aquí
);

// Crear el caso de uso para verificar el código
export const verifyCodeUseCase = new VerifyCodeUseCase(
    verificationFactoryRepository // Pasa el repositorio de verificación aquí
);

// Crear el controlador de verificación
export const verificationController = new VerificationController(
    sendVerificationCodeUseCase,
    verifyCodeUseCase, // Pasa el caso de uso de verificación aquí
    // verificationFactoryRepository, // Agrega el repositorio de verificación aquí
    // messagingService // Agrega el servicio de mensajería aquí
);
