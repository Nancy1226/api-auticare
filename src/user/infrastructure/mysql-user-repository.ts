import { query } from './mysql';
import { User } from "../domain/user";
import { UserRepository } from "../domain/user-repository";

export class MySQLUserRepository implements UserRepository {
  
  async getAll(): Promise<User[]> {
    const sql = 'SELECT * FROM users';
    const [rows] = await query(sql, []);
    console.log('=>', rows);

    let result = Object.values(JSON.parse(JSON.stringify(rows)))
    return result.map((row: any) => new User(
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


  async getUserById(id: string): Promise<User | null> {
    const sql = 'SELECT * FROM users WHERE id = ?';
    const params = [id];

    const [rows] = await query(sql, params);
    if (!rows) {
      return null; // cuando no se encontró ningún usuario con el ID 
    }

    // const userRow = rows[0];
    let [result] = JSON.parse(JSON.stringify(rows))
    const user = new User(
      result[0].id,
      result[0].name,
      result[0].email,
      result[0].password
    );

    return user;
  }

}
