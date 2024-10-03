// import CreateEspecialistaUseCase from "../application/create-especialista-usecase";
// import DeleteEspecialistaUseCase from "../application/delete-especialista-usecase";
// import { GetEspecialistaByID } from "../application/get-especialistaById-usecase";
// import GetEspecialistaListUseCase from "../application/get-especialistaList-usecase";
// import UpdateEspecialistaUseCase from "../application/update-especialista-usecase";
// import {SendVerificationCodeUseCase} from "../application/send-verification-code-usecase"; // Importar el caso de uso
// import EspecialistaController from "./controllers/especialista-controller";

// import { RepositoryFactory } from "./repository-factory";


// const especialistaFactoryRepository = RepositoryFactory.createEspecialistaRepository(); 

// export const getEspecialistaListUseCase = new GetEspecialistaListUseCase(
//   especialistaFactoryRepository
// ); 

// export const createEspecialistaUseCase = new CreateEspecialistaUseCase(
//   especialistaFactoryRepository
// );

// export const getEspecialistaById = new GetEspecialistaByID(
//   especialistaFactoryRepository
// );

// export const updateEspecialista = new UpdateEspecialistaUseCase(
//   especialistaFactoryRepository
// );

// export const deleteEspecialista = new DeleteEspecialistaUseCase(
//   especialistaFactoryRepository
// );

// // Crear el caso de uso para enviar el código de verificación
// export const sendVerificationCodeUseCase = new SendVerificationCodeUseCase(
//   especialistaFactoryRepository
// );

// export const especialistaController = new EspecialistaController(getEspecialistaListUseCase, createEspecialistaUseCase, getEspecialistaById, updateEspecialista, deleteEspecialista, sendVerificationCodeUseCase); 


import CreateEspecialistaUseCase from "../application/create-especialista-usecase";
import DeleteEspecialistaUseCase from "../application/delete-especialista-usecase";
import { GetEspecialistaByID } from "../application/get-especialistaById-usecase";
import GetEspecialistaListUseCase from "../application/get-especialistaList-usecase";
import UpdateEspecialistaUseCase from "../application/update-especialista-usecase";
import { SendVerificationCodeUseCase } from "../application/send-verification-code-usecase";
import EspecialistaController from "./controllers/especialista-controller";
import { RepositoryFactory } from "./repository-factory";
import {WhatsAppMessagingAdapter} from "../infrastructure/adaptadores/whatsappMessagingAdapter"; // Asegúrate de que el nombre sea correcto

const especialistaFactoryRepository = RepositoryFactory.createEspecialistaRepository();

// Instanciar el servicio de mensajería
const messagingService = new WhatsAppMessagingAdapter(); // Usa el nombre correcto aquí

export const getEspecialistaListUseCase = new GetEspecialistaListUseCase(
    especialistaFactoryRepository
);

export const createEspecialistaUseCase = new CreateEspecialistaUseCase(
    especialistaFactoryRepository
);

export const getEspecialistaById = new GetEspecialistaByID(
    especialistaFactoryRepository
);

export const updateEspecialista = new UpdateEspecialistaUseCase(
    especialistaFactoryRepository
);

export const deleteEspecialista = new DeleteEspecialistaUseCase(
    especialistaFactoryRepository
);

// Crear el caso de uso para enviar el código de verificación
export const sendVerificationCodeUseCase = new SendVerificationCodeUseCase(
    messagingService // Pasa el servicio de mensajería aquí
);

export const especialistaController = new EspecialistaController(
    getEspecialistaListUseCase,
    createEspecialistaUseCase,
    getEspecialistaById,
    updateEspecialista,
    deleteEspecialista,
    sendVerificationCodeUseCase
);
