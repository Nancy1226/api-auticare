import mongoose, { Schema } from 'mongoose';

const verificationLogSchema = new Schema({
  phoneNumber: { type: String, required: true },
  message: { type: String, required: true },
  sentAt: { type: Date, required: true },
});

export const VerificationLogModel = mongoose.model('VerificationLog', verificationLogSchema);
