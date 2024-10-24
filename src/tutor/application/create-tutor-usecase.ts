import { Tutor } from "../domain/tutor";
import { TutorRepository } from "../domain/tutor-repository";

class CreateTutorUseCase {
  constructor(private tutorRepository: TutorRepository) {}

  async execute(tutorPayload: Omit<Tutor, "id" & "uuid">): Promise<Tutor> {
    const tutor = new Tutor(
      null,
      tutorPayload.nombre,
      tutorPayload.apellido_paterno,
      tutorPayload.apellido_materno,
      tutorPayload.sexo,
      tutorPayload.correo,
      tutorPayload.contrasena, // Guardam la contraseña cifrada
      tutorPayload.telefono,
      tutorPayload.fecha_nacimiento,
      tutorPayload.tipo_usuario,
      tutorPayload.cargo
    );

    return this.tutorRepository.create(tutor);
  }
}

export default CreateTutorUseCase;
