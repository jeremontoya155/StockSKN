const pool = require('../config/db');

// Inicio de sesión
const iniciarSesion = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
    if (user.rows.length === 0) {
      return res.status(400).json({ error: 'Email o contraseña incorrectos.' });
    }

    // Guardar los datos del usuario en la sesión
    req.session.usuario = {
      id: user.rows[0].id,
      rol: user.rows[0].rol,
      cliente_id: user.rows[0].cliente_id,
    };

    res.json({ mensaje: 'Inicio de sesión exitoso.' });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error en el servidor.' });
  }
};

// Cerrar sesión
const cerrarSesion = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Error al cerrar la sesión.' });
    }
    res.json({ mensaje: 'Sesión cerrada con éxito.' });
  });
};

module.exports = {
  iniciarSesion,
  cerrarSesion,
};
