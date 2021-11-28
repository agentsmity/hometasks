import { Dialect } from 'sequelize/types';

export interface DatabaseConfig {
  dialect: Dialect;
  host: string;
  username: string;
  password: string;
  database: string;
  port: number;
}

export interface JwtConfig {
  secret: string;
}
