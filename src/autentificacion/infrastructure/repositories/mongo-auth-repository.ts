import { AuthRepository } from "../../domain/auth-repository";
import { TutorModel } from "../../../tutor/infrastructure/schemas/tutor-schema"; 
import { EspecialistaModel } from "../../../especialista/infrastructure/schemas/especialista-schema"; 

export class MongoAuthRepository implements AuthRepository {
  async validateUser(email: string, password: string): Promise<any> {
    // Intentar encontrar en la colección de Tutores
    const tutor = await TutorModel.findOne({ correo: email, contrasena: password }).exec();
    // Si se encuentra un tutor, retornarlo
    if (tutor) {
      return tutor;
    }
    
    // Si no se encuentra en tutores, intentar en la colección de Especialistas
    const especialista = await EspecialistaModel.findOne({ correo: email, contrasena: password }).exec();
    // Retornar el especialista si lo encuentras
    if (especialista) {
      return especialista;
    }
    
    // Si no se encuentra en ninguna de las dos colecciones, retornar null
    return null;
  }
}
