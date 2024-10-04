import { Verification } from "./verification";

export interface VerificationRepository {
    create(verification: Verification): Promise<Verification>;
    findByUuidAndCode(uuid: string, code: string): Promise<Verification | null>;
    delete(uuid: string): Promise<void>;
  }
  