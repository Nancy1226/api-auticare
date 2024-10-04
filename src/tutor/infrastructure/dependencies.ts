import CreateTutorUseCase from "../application/create-tutor-usecase";
import DeleteTutorUseCase from "../application/delete-tutor-usecase";
import { GetTutorByID } from "../application/get-tutorById-usecase";
import GetTutorListUseCase from "../application/get-tutorlist-usecase";
import UpdateTutorUseCase from "../application/update-tutor-usecase";
import TutorController from "./controllers/tutor-controller";
import { RepositoryFactory } from "./repository-factory";

const tutorFactoryRepository = RepositoryFactory.createTutorRepository(); 
// const mySqlUserReposritory = new MySQLUserRepository();

export const getTutorListUseCase = new GetTutorListUseCase(
  tutorFactoryRepository
); 

export const createTutorUseCase = new CreateTutorUseCase(
  tutorFactoryRepository
);

export const getTutorById = new GetTutorByID(
  tutorFactoryRepository
);

export const updateTutor = new UpdateTutorUseCase(
  tutorFactoryRepository
);

export const deleteTutor = new DeleteTutorUseCase(
  tutorFactoryRepository
);

export const tutorController = new TutorController(getTutorListUseCase, createTutorUseCase, getTutorById, updateTutor, deleteTutor); 
