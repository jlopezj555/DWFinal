const express = require('express');
const router = express.Router();

// Importar las rutas de cada recurso
const usuarioRoutes = require('./usuario.routes');
const espacioRoutes = require('./espacio.routes');
const reservaRoutes = require('./reservas.routes');

// Configurar las rutas base para cada recurso
router.use('/usuarios', usuarioRoutes);
router.use('/espacios', espacioRoutes);
router.use('/reservas', reservaRoutes);

module.exports = router;
