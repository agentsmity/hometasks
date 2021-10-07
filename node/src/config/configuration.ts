export default () => ({
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    db: process.env.DB_DB,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
  },
});
