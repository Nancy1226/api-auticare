import CreateEspecialistaUseCase from "../application/create-especialista-usecase";
import DeleteEspecialistaUseCase from "../application/delete-especialista-usecase";
import { GetEspecialistaByID } from "../application/get-especialistaById-usecase";
import GetEspecialistaListUseCase from "../application/get-especialistaList-usecase";
import UpdateEspecialistaUseCase from "../application/update-especialista-usecase";
import EspecialistaController from "./controllers/especialista-controller";
import { RepositoryFactory } from "./repository-factory";

const especialistaFactoryRepository = RepositoryFactory.createEspecialistaRepository(); 

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

export const especialistaController = new EspecialistaController(getEspecialistaListUseCase, createEspecialistaUseCase, getEspecialistaById, updateEspecialista, deleteEspecialista); 
