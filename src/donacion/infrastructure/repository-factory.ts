import { DonacionRepository } from "../domain/donacion-repository";
import { MongoDonacionRepository } from "./repositories/mongo-donacion-repository";
import { MySQLDonacionRepository } from "./repositories/mysql-donacion-repository";
import dotenv from 'dotenv';

dotenv.config();

const db_type = process.env.DB_TYPE;

export class RepositoryFactory {
  static createDonacionRepository(): DonacionRepository {
    if (db_type === 'mysql') {
      console.log("Estamos modo mysql")
      return new MySQLDonacionRepository();
    } else if (db_type === 'mongo') {
      console.log("Estamos modo mongo")
      return new MongoDonacionRepository();
    }
    throw new Error('Unsupported database type');
  }
}

