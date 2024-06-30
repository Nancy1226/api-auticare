import { UserRepository } from "../domain/user-repository";
import { MongoUserRepository } from "./mongo-user-repository";
import { MySQLUserRepository } from "./mysql-user-repository";
import dotenv from 'dotenv';

dotenv.config();

const db_type = process.env.DB_TYPE;

export class RepositoryFactory {
  static createUserRepository(): UserRepository {
    if (db_type === 'mysql') {
      console.log("Estamos modo mysql")
      return new MySQLUserRepository();
    } else if (db_type === 'mongo') {
      console.log("Estamos modo mongo")
      return new MongoUserRepository();
    }
    throw new Error('Unsupported database type');
  }
}

