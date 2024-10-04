import { Donacion } from "./donacion";

export interface DonacionRepository {
  save(donacion: Donacion): Promise<Donacion>;
  getAll(): Promise<Donacion[]>;
}

export default DonacionRepository;
