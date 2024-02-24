const express = require('express');
const pool = require('./db')

const app = express();
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

pool.on('connect', () => {
  console.log('pool connect success!');
});
