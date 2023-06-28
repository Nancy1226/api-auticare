import { User } from "./user";

// INTERFAS --> Para acceder a base de datos
export interface UserRepository {
  // getUserById(userId: string): Promise<User[] | null>; // Metodo para obtener una promesa con el usuario por medio de la ID
  getAll(): Promise<User[]>;

  create(user: User): Promise<User>;

  getUserById(userId: string): Promise<User | null>;
}

export default UserRepository;


/* DESDE INFRAESTRUCTURA ES DONDE SE IMPLEMENTA ESTE REPOSITORIO (se creara una BD simulada)*/
