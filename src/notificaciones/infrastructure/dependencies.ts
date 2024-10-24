import { SendWhatsAppTokenUseCase } from "../application/send-whatsapp-token-usecase";
import { VerifyTokenUseCase } from "../application/verify-token-usecase";
import { WhatsAppMessagingAdapter } from "./adaptadores/whatsapp-messaging-adapter";
import { NotificationController } from "./controllers/notification-controller";
import { RepositoryFactory } from "./repository-fractory";

const notificationFactoryRepository =
  RepositoryFactory.notificationRepository();
// Instanciar el servicio de mensajería
const messagingService = new WhatsAppMessagingAdapter(); // Usa el nombre correcto aquí

const sendWhatsAppTokenUseCase = new SendWhatsAppTokenUseCase(
  notificationFactoryRepository,
  messagingService
);
const verifyTokenUseCase = new VerifyTokenUseCase(
  notificationFactoryRepository
);

// Crear el controlador de verificación
export const notificationController = new NotificationController(
  sendWhatsAppTokenUseCase,
  verifyTokenUseCase
);
