const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Configuración de sesiones
app.use(session({
  secret: 'tu_secreto', // Cambia esto a un secreto seguro
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Establece "true" si usas HTTPS
}));

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Rutas para equipos (protegidas por sesión)
app.use('/api/equipments', equipmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
