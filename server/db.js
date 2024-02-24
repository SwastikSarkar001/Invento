// In db.js
const { Pool } = require("pg");

// The secret connection string you copied earlier
const connectionString =
  "postgresql://postgres:5bG5ee26D-bC61A436D216GDfcda5611@viaduct.proxy.rlwy.net:47239/railway";

const pool = new Pool({
  connectionString,
});

module.exports = pool;