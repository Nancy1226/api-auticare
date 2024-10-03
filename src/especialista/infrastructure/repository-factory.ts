import { EspecialistaRepository } from "../domain/especialista-repository";
import { MongoEspecialistaRepository } from "./repositories/mongo-especialista-repository";
import { MySQLEspecialistaRepository } from "./repositories/mysql-especialista-repository";
import dotenv from 'dotenv';

dotenv.config();

const db_type = process.env.DB_TYPE;

export class RepositoryFactory {
  static createEspecialistaRepository(): EspecialistaRepository {
    if (db_type === 'mysql') {
      console.log("Estamos modo mysql")
      return new MySQLEspecialistaRepository();
    } else if (db_type === 'mongo') {
      console.log("Estamos modo mongo")
      return new MongoEspecialistaRepository();
    }
    throw new Error('Unsupported database type');
  }
}

