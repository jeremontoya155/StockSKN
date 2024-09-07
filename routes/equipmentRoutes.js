const express = require('express');
const {
  obtenerEquiposPorCliente,
  obtenerEquipoPorId,
  cargarEquipo,
  borrarEquipo,
} = require('../controllers/equipmentController'); // Asegúrate de que la ruta y nombre sean correctos

const verificarSesion = require('../middlewares/authMiddleware'); // Importa el middleware de sesión

const router = express.Router();

// Proteger las rutas usando el middleware verificarSesion
router.get('/:clienteId', verificarSesion, obtenerEquiposPorCliente);
router.get('/:clienteId/:equipoId', verificarSesion, obtenerEquipoPorId);
router.post('/:clienteId', verificarSesion, cargarEquipo);
router.delete('/:equipoId', verificarSesion, borrarEquipo);

module.exports = router;
