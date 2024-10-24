import dotenv from "dotenv";

import { NotificationRepository } from "../domain/repositories/notification-repository";
import { MongoNotificationRepository } from "./repositories/mongo-notification-repository";
import { MySQLNotificationRepository } from "./repositories/mysql-notification-repository";

dotenv.config();

const db_type = process.env.DB_TYPE;

export class RepositoryFactory {
  static notificationRepository(): NotificationRepository {
    if (db_type === "mysql") {
      console.log("Estamos modo mysql");
      return new MySQLNotificationRepository();
    } else if (db_type === "mongo") {
      console.log("Estamos modo mongo");
      return new MongoNotificationRepository();
    }
    throw new Error("Unsupported database type");
  }
}
