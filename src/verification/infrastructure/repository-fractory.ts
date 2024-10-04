import { VerificationRepository } from "../domain/verification-repository";
import { MongoVerificationRepository } from "./repositories/mongo-verification-repository";
import { MysqlVerificationRepository } from "./repositories/mysql-verification-repository";
import dotenv from 'dotenv';

dotenv.config();

const db_type = process.env.DB_TYPE;

export class RepositoryFactory {
  static createVerificationRepository(): VerificationRepository {
    if (db_type === 'mysql') {
      console.log("Estamos modo mysql")
      return new MysqlVerificationRepository();
    } else if (db_type === 'mongo') {
      console.log("Estamos modo mongo")
      return new MongoVerificationRepository();
    }
    throw new Error('Unsupported database type');
  }
}

