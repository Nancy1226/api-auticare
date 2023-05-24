import { User } from "./user";

// INTERFAS --> Para acceder a base de datos, para obtener el email del user
export interface UserRepository {
  getUserById(userId: string): Promise<User | null>; // Metodo para obtener una promesa con el usuario por medio de la ID
}

/* DESDE INFRAESTRUCTURA ES DONDE SE IMPLEMENTA ESTE REPOSITORIO (se creara una BD simulada)*/
