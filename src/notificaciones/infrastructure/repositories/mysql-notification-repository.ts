import { query } from "../../../databases/mysql";
import { Token } from "../../domain/entities/token";
import { NotificationRepository } from "../../domain/repositories/notification-repository";

export class MySQLNotificationRepository implements NotificationRepository {
  async saveToken(token: Token): Promise<void> {
    const sql =
      "INSERT INTO Tokens (token, valid_at, user_id, status, uuid) VALUES (?, ?, ?, ?, ?)";
    await query(sql, [
      token.token,
      token.validAt,
      token.userId,
      token.status,
      token.uuid,
    ]);
  }

  async findByToken(token: string): Promise<Token | null> {
    const sql = "SELECT * FROM Tokens WHERE token = ?";
    const [rows]: any = await query(sql, [token]);

    if (rows.length === 0) {
      return null;
    }

    const row = rows[0];
    return new Token(
      row.id,
      row.token,
      row.valid_at,
      row.user_id,
      row.status,
      row.uuid
    );
  }

  async updateTokenStatus(tokenId: number, status: string): Promise<void> {
    const sql = "UPDATE Tokens SET status = ? WHERE id = ?";
    await query(sql, [status, tokenId]);
  }
}
