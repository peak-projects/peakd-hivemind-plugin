export default () => ({
  port: parseInt(process.env.PEAKD_PLUGIN_PORT, 10) || 3000,
  useHttps: process.env.PEAKD_PLUGIN_ENABLE_HTTPS === 'true',
  database: {
    host: process.env.PEAKD_PLUGIN_DB_HOST || 'localhost',
    port: parseInt(process.env.PEAKD_PLUGIN_DB_PORT, 10) || 5432,
    database: process.env.PEAKD_PLUGIN_DB_NAME || 'hive',
    username: process.env.PEAKD_PLUGIN_DB_USER,
    password: process.env.PEAKD_PLUGIN_DB_PWD,
    pool: {
      minConnections: parseInt(process.env.PEAKD_PLUGIN_DB_POOL_MIN, 10) || 5,
      maxConnections: parseInt(process.env.PEAKD_PLUGIN_DB_POOL_MAX, 10) || 20,
      idle: parseInt(process.env.PEAKD_PLUGIN_DB_POOL_IDLE, 10) || 30000,
    },
  }
});
