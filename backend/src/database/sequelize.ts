import { Sequelize } from "sequelize-typescript";

export const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  database: process.env.DB_DB,
  dialect: "mysql",
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  storage: ":memory:",
  modelPaths: [__dirname + "/../model"]
});