import { UserRepository } from "../domain/user-repository";

// CASO DE US0 --> ENVIAR EMAIL
export class WelcomeEmailSender {
  // para inyeccion de Dependencias para usar el user-repository con el que se accedera a BD --> Application pude saber de Domain
  constructor(private readonly userRepository: UserRepository) {}

  async run(userId: string) {
    // TODO: Metodo asincrono run, resive la ID del usuario para enviarle el Email
    // console.log("Envio email a", userId);
    // Aca deberia ir la logica de enviar email a los usuarios

    // Obtiene el usuario llamando al metodo getUserById de user-repository
    const user = await this.userRepository.getUserById(userId);

    // En caso de no encontrar al usuario
    if (!user) {
      throw new Error(`Id: ${userId} de usuario no encontrada`); //Lanza el error
    }
    // En el caso de que exista imprimira el email de este
    console.log("Envio email a", user.email);
  }
}
