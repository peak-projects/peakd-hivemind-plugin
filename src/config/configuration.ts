export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    database: process.env.DATABASE_NAME || 'hive',
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PWD,
    pool: {
      minConnections: parseInt(process.env.DATABASE_POOL_MIN, 10) || 5,
      maxConnections: parseInt(process.env.DATABASE_POOL_MAX, 10) || 20,
      idle: parseInt(process.env.DATABASE_POOL_IDLE, 10) || 30000,
    },
  }
});
