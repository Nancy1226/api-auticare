import mongoose, { Schema, Document } from 'mongoose';
import { Donacion } from '../../domain/donacion';

export interface DonacionDocument extends Donacion, Document {
  id: number | null;
  uuid: string;
  id_pago: string; // proporcionado por el sistema de pagos
  cantidad: number;
  moneda: string;
  estado_pago: string;
}

const donacionSchema: Schema = new Schema({
  uuid: { type: String, required: true },
  id_pago: { type: String, required: true },
  cantidad: { type: Number, required: true },
  moneda: { type: String, required: true },
  estado_pago: { type: String, required: true }
});

export const DonacionModel = mongoose.model<DonacionDocument>('donaciones', donacionSchema);