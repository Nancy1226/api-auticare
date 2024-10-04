import SaveDonacionUseCase from "../application/save-donacion-usecase";
import CreateDonacionUseCase from '../application/create-donation-usecase';
import DonacionController from "./controllers/donacion-controller";
import { RepositoryFactory } from "./repository-factory";
import { MercadoPagoServiceImpl } from "./mercadopago-service-impl";
import GetDonacionListUseCase from "../application/get-donacionList-usecase";

const donacionFactoryRepository = RepositoryFactory.createDonacionRepository(); 

const mercadoPagoService = new MercadoPagoServiceImpl();

export const saveDonacionUseCase = new SaveDonacionUseCase(
  donacionFactoryRepository
);

const createDonacionUseCase = new CreateDonacionUseCase(mercadoPagoService);

export const getDonacionListUseCase = new GetDonacionListUseCase(
  donacionFactoryRepository
);

export const donacionController = new DonacionController(saveDonacionUseCase, createDonacionUseCase, getDonacionListUseCase); 
