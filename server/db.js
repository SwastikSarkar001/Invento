const { Pool } = require('pg');
require('dotenv').config();

// The secret connection string you copied earlier
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
});

// Check if the database is connected
pool.on('connect', () => {
  console.log('Connected to the database');
});

// Handle errors
pool.on('error', (err) => {
  console.error('Error connecting to the database:', err.message);
});

module.exports = pool;
