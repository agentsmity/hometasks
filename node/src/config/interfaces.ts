import { Dialect } from "sequelize/types";

export interface DatabaseConfig {
  dialect: Dialect;
  host: string;
  user: string;
  pass: string;
  db: string;
  port: number;
}
