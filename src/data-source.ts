import "reflect-metadata";
import "dotenv/config";
import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";

const setDataSourceConfig = (): DataSourceOptions => {
  const entitiesPath: string = path.join(__dirname, "./entities/**.ts");
  const migrationsPath: string = path.join(__dirname, "./migrations/**.ts");
  // const entitiesPath: string =
  //   "/c/Users/lucas/Courses/Portfolio/Projetos_backend/coin_conversor/src/entities/**.{js,ts}";
  // const migrationsPath: string =
  //   "/c/Users/lucas/Courses/Portfolio/Projetos_backend/coin_conversor/src/migrations/**.{js,ts}";

  const nodeEnv = process.env.NODE_ENV;

  console.log(entitiesPath);
  console.log(migrationsPath);
  // console.log(
  //   Object.fromEntries(
  //     Object.entries(process.env).filter(([k, v]) => k.includes("PG"))
  //   )
  // );

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
    entities: [entitiesPath],
    migrations: [migrationsPath],
  };
};

console.log(setDataSourceConfig());
export const AppDataSource = new DataSource(setDataSourceConfig());
