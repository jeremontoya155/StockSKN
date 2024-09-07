const pool = require('../config/db');

const createClientTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS clients (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(100),
      contacto VARCHAR(100),
      creado_el TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

module.exports = { createClientTable };

