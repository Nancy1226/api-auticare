import { query } from './mysql';
import { User } from "../domain/user";
import { UserRepository } from "../domain/user-repository";

export class MySQLUserRepository implements UserRepository {
  async getAll(): Promise<User[]> {
    const sql = 'SELECT * FROM users';
    const rows = await query(sql, []);
    console.log('=>', rows[0]);

    return rows.map((row: any) => new User(
      row.id,
      row.name,
      row.email,
      row.password
    ));
  }

  async create(user: User): Promise<User> {
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    const params = [user.name, user.email, user.password];

    await query(sql, params);

    return user;
  }
}
