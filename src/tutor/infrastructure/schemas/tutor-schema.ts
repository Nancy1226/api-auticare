import mongoose, { Schema, Document } from 'mongoose';
import { Tutor } from '../../domain/tutor';

export interface TutorDocument extends Tutor, Document {
  id: number | null;
  uuid: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  sexo: string;
  correo: string;
  contrasena: string;
  telefono: string;
  fecha_nacimiento: string;
  tipo_usuario: string;
  cargo: string; /* Si es tipo TUTOR */
}

const TutorSchema: Schema = new Schema({
  uuid: { type: String, required: true },
  nombre: { type: String, required: true },
  apellido_paterno: { type: String, required: true },
  apellido_materno: { type: String, required: true },
  sexo: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  telefono: { type: String, required: true },
  fecha_nacimiento: { type: String, required: true },
  tipo_usuario: { type: String, default: 'Tutor' },
  cargo: { type: String, required: true }
});

export const TutorModel = mongoose.model<TutorDocument>('tutores', TutorSchema);