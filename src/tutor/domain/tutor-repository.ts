import { Tutor } from "./tutor";

export interface TutorRepository {
  // Metodo para obtener una promesa con todos los usuarios
  getAll(): Promise<Tutor[]>;

  // Metodo para crear un nuevo usuario
  create(tutor: Tutor): Promise<Tutor>;

  // Metodo para obtener un usuario por ID
  getTutorById(tutorId: string): Promise<Tutor | null>;
  
  // Metodo para actualizar un usuario por ID
  updateTutor(tutorId: string, tutor: Partial<Tutor>): Promise<Tutor | null>;
  
  // Metodo para eliminar un usuario por ID
  deleteTutor(tutorId: string): Promise<boolean>;
}

export default TutorRepository;
