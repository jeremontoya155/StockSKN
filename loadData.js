// loadClientsWithEquipments.js

const pool = require('./config/db');

// Función para cargar clientes con equipos
const cargarClientesYEquipos = async (clientesConEquipos) => {
  try {
    for (const cliente of clientesConEquipos) {
      // Primero, cargar el cliente
      const clienteInsertado = await pool.query(
        'INSERT INTO clients (nombre, contacto) VALUES ($1, $2) RETURNING id',
        [cliente.nombre, cliente.contacto]
      );

      const clienteId = clienteInsertado.rows[0].id; // Obtener el ID del cliente insertado

      // Luego, cargar los equipos asociados a este cliente
      for (const equipo of cliente.equipos) {
        await pool.query(
          'INSERT INTO equipments (cliente_id, nombre_equipo, detalles_componentes) VALUES ($1, $2, $3)',
          [clienteId, equipo.nombre_equipo, equipo.detalles_componentes]
        );
      }
    }

    console.log('Clientes y equipos cargados con éxito.');
  } catch (error) {
    console.error('Error cargando clientes y equipos:', error);
  } finally {
    // Cerrar la conexión al pool
    await pool.end();
  }
};

// Datos de ejemplo para los clientes y sus equipos
const clientesConEquipos = [
  {
    nombre: 'Cliente A',
    contacto: 'clienteA@example.com',
    equipos: [
      {
        nombre_equipo: 'Equipo A1',
        detalles_componentes: {
          procesador: 'Intel i7',
          memoria: '16GB',
          almacenamiento: '1TB SSD',
        },
      },
      {
        nombre_equipo: 'Equipo A2',
        detalles_componentes: {
          procesador: 'AMD Ryzen 5',
          memoria: '8GB',
          almacenamiento: '512GB SSD',
        },
      },
    ],
  },
  {
    nombre: 'Cliente B',
    contacto: 'clienteB@example.com',
    equipos: [
      {
        nombre_equipo: 'Equipo B1',
        detalles_componentes: {
          procesador: 'Intel i5',
          memoria: '8GB',
          almacenamiento: '1TB HDD',
        },
      },
    ],
  },
];

// Ejecutar la función para cargar clientes y equipos
cargarClientesYEquipos(clientesConEquipos);
