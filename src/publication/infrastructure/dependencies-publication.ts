import CreatePublicationUseCase from "../application/create-publication-usecase";
import DeletePublicationUseCase from "../application/delete-publication-usecase";
import { GetPublicationByID } from "../application/get-publicationById-usecase";
import GetPublicationListUseCase from "../application/get-publicationlist-usecase";
import UpdatePublicationUseCase from "../application/update-publication-usecase";
import PublicationController from "./controllers/publication-controller";

import { RepositoryFactory } from "./adapters/repositories/repository-factory";

const publicationRepository = RepositoryFactory.createPublicationRepository();

export const getPublicationListUseCase = new GetPublicationListUseCase(
  publicationRepository
);

export const createPublicationUseCase = new CreatePublicationUseCase(
  publicationRepository
);

export const getPublicationById = new GetPublicationByID(
  publicationRepository
);

export const updatePublication = new UpdatePublicationUseCase(
  publicationRepository
);

export const deletePublication = new DeletePublicationUseCase(
  publicationRepository
);

export const publicationController = new PublicationController(
  getPublicationListUseCase, 
  createPublicationUseCase, 
  getPublicationById, 
  updatePublication, 
  deletePublication
);
