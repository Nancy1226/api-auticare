import mongoose, { Document, Schema } from "mongoose";

interface TokenDocument extends Document {
  id: number | null;
  token: string;
  validAt: Date;
  userId: number;
  status: string;
  uuid: string;
}

const TokenSchema: Schema = new Schema({
  token: { type: String, required: true },
  validAt: { type: Date, required: true },
  userId: { type: String, required: true },
  status: { type: String, required: true },
  uuid: { type: String, required: true },
});

export const TokenModel = mongoose.model<TokenDocument>("Token", TokenSchema);
