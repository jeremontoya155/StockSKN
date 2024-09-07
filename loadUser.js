// loadUsers.js

const pool = require('./config/db');

// Función para cargar usuarios
const cargarUsuarios = async (usuarios) => {
  try {
    for (const usuario of usuarios) {
      const { nombre, email, password, rol, cliente_id } = usuario;

      await pool.query(
        'INSERT INTO users (nombre, email, password, rol, cliente_id) VALUES ($1, $2, $3, $4, $5)',
        [nombre, email, password, rol, cliente_id]
      );
    }
    console.log('Usuarios cargados con éxito.');
  } catch (error) {
    console.error('Error cargando usuarios:', error);
  } finally {
    // Cerrar la conexión al pool
    await pool.end();
  }
};

// Datos de ejemplo para los usuarios
const usuarios = [
  {
    nombre: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    rol: 'admin',
    cliente_id: null, // No está asociado con ningún cliente
  },
  {
    nombre: 'Cliente A',
    email: 'clienteA@example.com',
    password: 'clienteA123',
    rol: 'cliente',
    cliente_id: 1, // Asociado al cliente con id 1
  },
  {
    nombre: 'Cliente B',
    email: 'clienteB@example.com',
    password: 'clienteB123',
    rol: 'cliente',
    cliente_id: 2, // Asociado al cliente con id 2
  },
];

// Ejecutar la función para cargar usuarios
cargarUsuarios(usuarios);
