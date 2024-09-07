const pool = require('../config/db');

// Obtener todos los equipos de un cliente en particular
const obtenerEquiposPorCliente = async (req, res) => {
  const { clienteId } = req.params;

  // Verificar que el cliente corresponde al usuario autenticado
  if (req.session.usuario.rol !== 'admin' && req.session.usuario.cliente_id !== parseInt(clienteId)) {
    return res.status(403).json({ error: 'No tienes permiso para ver estos equipos.' });
  }

  try {
    const result = await pool.query('SELECT * FROM equipments WHERE cliente_id = $1', [clienteId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error obteniendo equipos:', error);
    res.status(500).json({ error: 'Error al obtener equipos.' });
  }
};

// Obtener un equipo específico de un cliente
const obtenerEquipoPorId = async (req, res) => {
  const { clienteId, equipoId } = req.params;

  // Verificar que el cliente corresponde al usuario autenticado
  if (req.session.usuario.rol !== 'admin' && req.session.usuario.cliente_id !== parseInt(clienteId)) {
    return res.status(403).json({ error: 'No tienes permiso para ver este equipo.' });
  }

  try {
    const result = await pool.query('SELECT * FROM equipments WHERE cliente_id = $1 AND id = $2', [clienteId, equipoId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Equipo no encontrado.' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error obteniendo equipo:', error);
    res.status(500).json({ error: 'Error al obtener equipo.' });
  }
};

// Cargar un equipo para un cliente específico
const cargarEquipo = async (req, res) => {
  const { clienteId } = req.params;
  const { nombre_equipo, detalles_componentes } = req.body;

  // Verificar que el cliente corresponde al usuario autenticado
  if (req.session.usuario.rol !== 'admin' && req.session.usuario.cliente_id !== parseInt(clienteId)) {
    return res.status(403).json({ error: 'No tienes permiso para agregar equipos a este cliente.' });
  }

  try {
    await pool.query(
      'INSERT INTO equipments (cliente_id, nombre_equipo, detalles_componentes) VALUES ($1, $2, $3)',
      [clienteId, nombre_equipo, detalles_componentes]
    );
    res.status(201).json({ mensaje: 'Equipo cargado con éxito.' });
  } catch (error) {
    console.error('Error cargando equipo:', error);
    res.status(500).json({ error: 'Error al cargar equipo.' });
  }
};

// Borrar un equipo específico
const borrarEquipo = async (req, res) => {
  const { equipoId } = req.params;

  try {
    const result = await pool.query('DELETE FROM equipments WHERE id = $1 RETURNING *', [equipoId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Equipo no encontrado.' });
    }

    res.json({ mensaje: 'Equipo eliminado con éxito.' });
  } catch (error) {
    console.error('Error eliminando equipo:', error);
    res.status(500).json({ error: 'Error al eliminar equipo.' });
  }
};

module.exports = {
  obtenerEquiposPorCliente,
  obtenerEquipoPorId,
  cargarEquipo,
  borrarEquipo,
};
