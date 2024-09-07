const pool = require('../config/db');

const createUserTable = async () => {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(100),
        rol VARCHAR(20) DEFAULT 'cliente',
        cliente_id INTEGER REFERENCES clients(id) ON DELETE SET NULL,
        creado_el TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  };
  

module.exports = { createUserTable };
