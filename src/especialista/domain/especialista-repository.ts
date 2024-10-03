import { Especialista } from "./especialista";

export interface EspecialistaRepository {
  getAll(): Promise<Especialista[]>;
  /* ACA PODRIA IR EL ENVIO DE EMAIL, POR QUE SI SE REGISTRA EL USUARION ES SI SE VALIDO LA CEDULA */
  create(tutor: Especialista): Promise<Especialista>;
  getEspecialistaById(tutorId: string): Promise<Especialista | null>;
  updateEspecialista(tutorId: string, tutor: Partial<Especialista>): Promise<Especialista | null>;
  deleteEspecialista(tutorId: string): Promise<boolean>;
}

export default EspecialistaRepository;
