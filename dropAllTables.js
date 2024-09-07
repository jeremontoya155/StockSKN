// dropAllTables.js

const pool = require('./config/db');

const dropTables = async () => {
  try {
    await pool.query('BEGIN');

    // Orden de eliminación: primero las tablas que dependen de otras
    await pool.query('DROP TABLE IF EXISTS equipments CASCADE;');
    await pool.query('DROP TABLE IF EXISTS clients CASCADE;');
    await pool.query('DROP TABLE IF EXISTS users CASCADE;');
    // Añade más tablas según sea necesario

    await pool.query('COMMIT');
    console.log('Todas las tablas han sido eliminadas con éxito.');
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error('Error al eliminar las tablas:', error);
  } finally {
    await pool.end();
  }
};

dropTables();
