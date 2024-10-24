import CreateDonacionUseCase from "../application/create-donation-usecase";
import GetDonacionListUseCase from "../application/get-donacionList-usecase";
import SaveDonacionUseCase from "../application/save-donacion-usecase";
import DonacionController from "./controllers/donacion-controller";
import { MercadoPagoServiceImpl } from "./mercadopago-service-impl";
import { RepositoryFactory } from "./repository-factory";

const donacionFactoryRepository = RepositoryFactory.createDonacionRepository();

const mercadoPagoService = new MercadoPagoServiceImpl();

export const saveDonacionUseCase = new SaveDonacionUseCase(
  donacionFactoryRepository
);

const createDonacionUseCase = new CreateDonacionUseCase(mercadoPagoService);

export const getDonacionListUseCase = new GetDonacionListUseCase(
  donacionFactoryRepository
);

export const donacionController = new DonacionController(
  saveDonacionUseCase,
  createDonacionUseCase,
  getDonacionListUseCase
);
