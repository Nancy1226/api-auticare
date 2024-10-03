import { Especialista } from "../../domain/especialista";
import { EspecialistaRepository } from "../../domain/especialista-repository";
import { EspecialistaModel } from "../schemas/especialista-schema"; // Esquema de Mongoose

export class MongoEspecialistaRepository implements EspecialistaRepository {

  // Listar todos los tutores
  async getAll(): Promise<Especialista[]> {
    const especialistas = await EspecialistaModel.find();
    
    return especialistas.map(especialista => new Especialista(
      especialista.id,
      especialista.uuid,
      especialista.nombre,
      especialista.apellido_paterno,
      especialista.apellido_materno,
      especialista.sexo,
      especialista.correo,
      especialista.contrasena,
      especialista.telefono,
      especialista.fecha_nacimiento,
      'Especialista', // Tipo de usuario por defecto
      especialista.titulo_especialidad,
      especialista.cedula_profesional,
      especialista.cedula_validada
    ));
  }

  // Crear un nuevo tutor
  async create(especialista: Especialista): Promise<Especialista> {
    const newEspecialista = new EspecialistaModel({
      nombre: especialista.nombre,
      apellido_paterno: especialista.apellido_paterno,
      apellido_materno: especialista.apellido_materno,
      sexo: especialista.sexo,
      correo: especialista.correo,
      contrasena: especialista.contrasena,
      telefono: especialista.telefono,
      fecha_nacimiento: especialista.fecha_nacimiento,
      titulo_especialidad: especialista.titulo_especialidad,
      cedula_profesional: especialista.cedula_profesional,
      cedula_validada: especialista.cedula_validada,
      tipo_usuario: 'Especialista' // Tipo de usuario definido como Tutor
    });

    const savedEspecialista = await newEspecialista.save();
    return new Especialista(
      savedEspecialista.id,
      savedEspecialista.uuid,
      savedEspecialista.nombre,
      savedEspecialista.apellido_paterno,
      savedEspecialista.apellido_materno,
      savedEspecialista.sexo,
      savedEspecialista.correo,
      savedEspecialista.contrasena,
      savedEspecialista.telefono,
      savedEspecialista.fecha_nacimiento,
      'Especialista', 
      savedEspecialista.titulo_especialidad, 
      savedEspecialista.cedula_profesional, 
      savedEspecialista.cedula_validada
    );
  }

  // Obtener un tutor por su ID
  async getEspecialistaById(id: string): Promise<Especialista | null> {
    const especialista = await EspecialistaModel.findById(id);

    if (!especialista) {
      return null;
    }

    return new Especialista(
      especialista.id,
      especialista.uuid,
      especialista.nombre,
      especialista.apellido_paterno,
      especialista.apellido_materno,
      especialista.sexo,
      especialista.correo,
      especialista.contrasena,
      especialista.telefono,
      especialista.fecha_nacimiento,
      especialista.tipo_usuario,
      especialista.titulo_especialidad,
      especialista.cedula_profesional,
      especialista.cedula_validada
    );
  }

  // Actualizar un tutor
  async updateEspecialista(id: string, newEspecialista: Partial<Especialista>): Promise<Especialista | null> {
    const updatedEspecialista = await EspecialistaModel.findByIdAndUpdate(id, newEspecialista, { new: true });

    if (!updatedEspecialista) {
      return null;
    }

    return new Especialista(
      updatedEspecialista.id,
      updatedEspecialista.uuid,
      updatedEspecialista.nombre,
      updatedEspecialista.apellido_paterno,
      updatedEspecialista.apellido_materno,
      updatedEspecialista.sexo,
      updatedEspecialista.correo,
      updatedEspecialista.contrasena,
      updatedEspecialista.telefono,
      updatedEspecialista.fecha_nacimiento,
      updatedEspecialista.tipo_usuario,
      updatedEspecialista.titulo_especialidad,
      updatedEspecialista.cedula_profesional,
      updatedEspecialista.cedula_validada
    );
  }

  // Eliminar un tutor
  async deleteEspecialista(id: string): Promise<boolean> {
    const result = await EspecialistaModel.findByIdAndDelete(id);
    return result !== null;
  }

}
