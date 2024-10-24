import { Token } from "../entities/token";

export interface NotificationRepository {
  saveToken(token: Token): Promise<void>;
  findByToken(token: string): Promise<Token | null>;
  updateTokenStatus(tokenId: number, status: string): Promise<void>;
}
