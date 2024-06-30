import mongoose, { Schema, Document } from 'mongoose';
import { Publication } from '../domain/publication';

export interface PublicationDocument extends Publication, Document {
  id: number | null;
  title: string;
  description: string;
  price: number;
  image: string;
  image_s3: string;
}

const UserSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  image_s3: { type: String, required: true },
});

export const PublicationModel = mongoose.model<PublicationDocument>('publications', UserSchema);