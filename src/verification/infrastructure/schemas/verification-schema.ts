import mongoose, { Schema, Document } from 'mongoose';
import { Verification } from '../../domain/verification';

export interface VerificationDocument extends Verification, Document {
  id: number | null;
  verificationCode: string;
  createdAt: Date
}

const VerificationSchema: Schema = new Schema({
  verificationCode: { type: String, required: true }  
});

export const VerificationModel = mongoose.model<VerificationDocument>('verifications', VerificationSchema);