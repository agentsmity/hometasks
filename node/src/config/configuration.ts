export default () => ({
  database: {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB,
    port: parseInt(process.env.DB_PORT, 10),
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
