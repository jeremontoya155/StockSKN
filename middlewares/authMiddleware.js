// Middleware para verificar si el usuario ha iniciado sesión
const verificarSesion = (req, res, next) => {
    if (!req.session.usuario) {
      return res.status(401).json({ error: 'Acceso denegado. Debes iniciar sesión.' });
    }
    next();
  };
  
  module.exports = verificarSesion;
  