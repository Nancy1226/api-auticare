// infrastructure/repository-factory.ts
import { PublicationRepository } from "../domain/publication-repository";
import { MongoPublicationRepository } from "./mongo-publication-repository";
import { MySQLPublicationRepository } from "./mysql-publication-repository";
import dotenv from 'dotenv';

dotenv.config();

const db_type = process.env.DB_TYPE; // memoria

export class RepositoryFactory {
  static createPublicationRepository(): PublicationRepository {
    if (db_type === 'mysql') {
      console.log("Estamos modo mysql")
      return new MySQLPublicationRepository();
    } else if (db_type === 'mongo') {
      console.log("Estamos modo mongo")
      return new MongoPublicationRepository();
    }
    throw new Error('Unsupported database type');
  }
}

