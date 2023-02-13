import "reflect-metadata";
import "dotenv/config";
import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "./entities/user.entity";
import { Transaction } from "./entities/transactions.entity";
import { initialMigration1676303316110 } from "./migrations/1676303316110-initialMigration";
import { insertAdmUser1676303346976 } from "./migrations/1676303346976-insertAdmUser";

const setDataSourceConfig = (): DataSourceOptions => {
  const entitiesPath: string = path.join(__dirname, "./entities/**.ts");
  const migrationsPath: string = path.join(__dirname, "./migrations/**.ts");

  const nodeEnv = process.env.NODE_ENV;

  if (nodeEnv === "production") {
    return {
      type: "postgres",
      url: process.env.DATABASE_URL,
      entities: [__dirname + "/entities/**.js"],
      migrations: [__dirname + "/migrations/**.js"],
    };
  }

  if (nodeEnv === "test") {
    return {
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      entities: [entitiesPath],
    };
  }

  return {
    type: "postgres",
    host: process.env.PGHOST,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: parseInt(process.env.PGPORT),
    database: process.env.PGDATABASE,
    synchronize: false,
    logging: true,
    entities: [User, Transaction],
    migrations: [initialMigration1676303316110, insertAdmUser1676303346976],
  };
};

export const AppDataSource = new DataSource(setDataSourceConfig());
