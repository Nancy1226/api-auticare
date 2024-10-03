import mongoose, { Schema, Document } from 'mongoose';
import { Especialista } from '../../domain/especialista';

export interface EspecialistaDocument extends Especialista, Document {
  id: number | null;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  sexo: string;
  correo: string;
  contrasena: string;
  telefono: string;
  fecha_nacimiento: string;
  tipo_usuario: string;
  titulo_especialidad: string;
  cedula_profesional: string; 
  cedula_validada: boolean;
}

const EspecialistaSchema: Schema = new Schema({
  nombre: { type: String, required: true },
  apellido_paterno: { type: String, required: true },
  apellido_materno: { type: String, required: true },
  sexo: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  telefono: { type: String, required: true },
  fecha_nacimiento: { type: String, required: true },
  tipo_usuario: { type: String, default: 'Especialista' },
  titulo_especialidad: { type: String, required: true },
  cedula_profesional: { type: String, required: true },
  cedula_validada: { type: Boolean, required: true }
});

export const EspecialistaModel = mongoose.model<EspecialistaDocument>('especialistas', EspecialistaSchema);