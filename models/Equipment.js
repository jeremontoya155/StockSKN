const pool = require('../config/db');

const createEquipmentTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS equipments (
      id SERIAL PRIMARY KEY,
      cliente_id INTEGER REFERENCES clients(id),
      nombre_equipo VARCHAR(100),
      detalles_componentes JSONB,
      creado_el TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};


module.exports = { createEquipmentTable };
