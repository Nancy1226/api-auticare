import { Token } from "../../domain/entities/token";
import { NotificationRepository } from "../../domain/repositories/notification-repository";
import { TokenModel } from "../schemas/token-schema"; // Asegúrate de que este esquema está definido

export class MongoNotificationRepository implements NotificationRepository {
  // Guardar token
  async saveToken(token: Token): Promise<void> {
    const newToken = new TokenModel({
      token: token.token,
      validAt: token.validAt,
      userId: token.userId,
      status: token.status,
      uuid: token.uuid,
    });

    await newToken.save();
  }

  // Buscar token por el valor del token
  async findByToken(token: string): Promise<Token | null> {
    const foundToken = await TokenModel.findOne({ token });

    if (!foundToken) {
      return null;
    }

    return new Token(
      foundToken.id,
      foundToken.token,
      foundToken.validAt,
      foundToken.userId,
      foundToken.status,
      foundToken.uuid
    );
  }

  // Actualizar estado del token por ID
  async updateTokenStatus(tokenId: number, status: string): Promise<void> {
    await TokenModel.updateOne({ id: tokenId }, { status });
  }
}
