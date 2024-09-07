const express = require('express');
const { iniciarSesion, cerrarSesion } = require('../controllers/authController');

const router = express.Router();

router.post('/login', iniciarSesion);
router.post('/logout', cerrarSesion);

module.exports = router;
