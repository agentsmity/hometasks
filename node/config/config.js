const dotenv = require("dotenv");

dotenv.config();

let config = {
  "development": {
    "dialect": process.env.DB_DIALECT,
    "host": process.env.DB_HOST,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_DB,
    "port": parseInt(process.env.DB_PORT, 10),
  }
}

module.exports = config;
