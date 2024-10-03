import { TutorRepository } from "../domain/tutor-repository";
import { MongoTutorRepository } from "./repositories/mongo-user-repository";
import { MySQLTutorRepository } from "./repositories/mysql-tutor-repository";
import dotenv from 'dotenv';

dotenv.config();

const db_type = process.env.DB_TYPE;

export class RepositoryFactory {
  static createTutorRepository(): TutorRepository {
    if (db_type === 'mysql') {
      console.log("Estamos modo mysql")
      return new MySQLTutorRepository();
    } else if (db_type === 'mongo') {
      console.log("Estamos modo mongo")
      return new MongoTutorRepository();
    }
    throw new Error('Unsupported database type');
  }
}

