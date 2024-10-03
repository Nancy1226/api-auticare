import { EspecialistaRepository } from '../domain/especialista-repository';
import { Especialista } from '../domain/especialista';

class CreateEspecialistaUseCase {
  constructor(private especialistaRepository: EspecialistaRepository) {}

  async execute(especialistaPayload: Omit<Especialista, 'id'>): Promise<Especialista> {
    const tutor = new Especialista(
      null, 
      especialistaPayload.uuid,
      especialistaPayload.nombre,
      especialistaPayload.apellido_paterno,
      especialistaPayload.apellido_materno, 
      especialistaPayload.sexo,
      especialistaPayload.correo, 
      especialistaPayload.contrasena,
      especialistaPayload.telefono, 
      especialistaPayload.fecha_nacimiento,
      especialistaPayload.tipo_usuario, 
      especialistaPayload.titulo_especialidad, 
      especialistaPayload.cedula_profesional, 
      especialistaPayload.cedula_validada
    );

    /* SI LA CEDULA ESVALIDA SE GUARDA EN BD, si no, SE ENVIA UN CORREO PARA PEDIR QUE LO VUELVA A INTENTAR*/

    return this.especialistaRepository.create(tutor);
  }
}

export default CreateEspecialistaUseCase;
