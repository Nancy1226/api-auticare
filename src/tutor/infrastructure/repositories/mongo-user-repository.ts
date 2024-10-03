import { Tutor } from "../../domain/tutor";
import { TutorRepository } from "../../domain/tutor-repository";
import { TutorModel } from "../schemas/tutor-schema"; // Esquema de Mongoose

export class MongoTutorRepository implements TutorRepository {

  // Listar todos los tutores
  async getAll(): Promise<Tutor[]> {
    const tutors = await TutorModel.find();
    
    return tutors.map(tutor => new Tutor(
      tutor.id,
      tutor.uuid,
      tutor.nombre,
      tutor.apellido_paterno,
      tutor.apellido_materno,
      tutor.sexo,
      tutor.correo,
      tutor.contrasena,
      tutor.telefono,
      tutor.fecha_nacimiento,
      'Tutor', // Tipo de usuario por defecto
      tutor.cargo
    ));
  }

  // Crear un nuevo tutor
  async create(tutor: Tutor): Promise<Tutor> {
    const newTutor = new TutorModel({
      uuid: tutor.uuid,
      nombre: tutor.nombre,
      apellido_paterno: tutor.apellido_paterno,
      apellido_materno: tutor.apellido_materno,
      sexo: tutor.sexo,
      correo: tutor.correo,
      contrasena: tutor.contrasena,
      telefono: tutor.telefono,
      fecha_nacimiento: tutor.fecha_nacimiento,
      cargo: tutor.cargo,
      tipo_usuario: 'Tutor' // Tipo de usuario definido como Tutor
    });

    const savedTutor = await newTutor.save();
    return new Tutor(
      savedTutor.id,
      savedTutor.uuid,
      savedTutor.nombre,
      savedTutor.apellido_paterno,
      savedTutor.apellido_materno,
      savedTutor.sexo,
      savedTutor.correo,
      savedTutor.contrasena,
      savedTutor.telefono,
      savedTutor.fecha_nacimiento,
      'Tutor', 
      savedTutor.cargo
    );
  }

  // Obtener un tutor por su ID
  async getTutorById(id: string): Promise<Tutor | null> {
    const tutor = await TutorModel.findById(id);

    if (!tutor) {
      return null;
    }

    return new Tutor(
      tutor.id,
      tutor.uuid,
      tutor.nombre,
      tutor.apellido_paterno,
      tutor.apellido_materno,
      tutor.sexo,
      tutor.correo,
      tutor.contrasena,
      tutor.telefono,
      tutor.fecha_nacimiento,
      tutor.tipo_usuario,
      tutor.cargo
    );
  }

  // Actualizar un tutor
  async updateTutor(id: string, newTutor: Partial<Tutor>): Promise<Tutor | null> {
    const updatedTutor = await TutorModel.findByIdAndUpdate(id, newTutor, { new: true });

    if (!updatedTutor) {
      return null;
    }

    return new Tutor(
      updatedTutor.id,
      updatedTutor.uuid,
      updatedTutor.nombre,
      updatedTutor.apellido_paterno,
      updatedTutor.apellido_materno,
      updatedTutor.sexo,
      updatedTutor.correo,
      updatedTutor.contrasena,
      updatedTutor.telefono,
      updatedTutor.fecha_nacimiento,
      updatedTutor.tipo_usuario,
      updatedTutor.cargo
    );
  }

  // Eliminar un tutor
  async deleteTutor(id: string): Promise<boolean> {
    const result = await TutorModel.findByIdAndDelete(id);
    return result !== null;
  }

  // Encontrar un tutor por correo electrónico
  // async findByEmail(correo: string): Promise<Tutor | null> {
  //   const tutor = await TutorModel.findOne({ correo_electronico: correo });

  //   if (!tutor) {
  //     return null;
  //   }

  //   return new Tutor(
  //     tutor.id,
  //     tutor.nombre,
  //     tutor.apellido_paterno,
  //     tutor.apellido_materno,
  //     tutor.sexo,
  //     tutor.correo,
  //     tutor.contrasena,
  //     tutor.telefono,
  //     tutor.fecha_nacimiento,
  //     tutor.tipo_usuario,
  //     tutor.cargo
  //   );
  // }
}
