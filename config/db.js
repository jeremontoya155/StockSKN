const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect()
  .then(() => console.log('Conectado a la base de datos'))
  .catch((err) => console.error('Error conectando a la base de datos', err));

module.exports = pool;
