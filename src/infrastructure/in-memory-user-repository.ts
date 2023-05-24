import { User } from "../domain/user";
import { UserRepository } from "../domain/user-repository";

const users: User[] = [
  {
    id: "1",
    email: "fran@gmail.com",
  },
  {
    id: "2",
    email: "pepe@gmail.com",
  },
];

// exporta clase del repository que implementa el user-repository de la capa de dominio, para inyectar por dependencias este MemoryUserRepository a la capa de aplicacion al caso de uso
export class InMemoryUserRepository implements UserRepository {
  // Aca es basicamente la parte buena donde se hace la busqueda en los datos
  async getUserById(userId: string): Promise<User | null> {
    const user = users.find((user) => user.id === userId);

    // Si no lo encuentra devuelve null
    if (!user) {
      return null;
    }

    // Si existe, devuelve el usuario
    return new User(user.id, user.email);
  }

  // YA EN LA CAPA DE DEPENDENCIAS DE PUEDE INSTANCIAR ESTA CLASE PARA SER INYECTADA AL WelcomeEmailSender
}
