const express = require('express');
const router = express.Router();
const { createUsuario, getUsuarios} = require('../controllers/usuario.controller');

// Crear un nuevo usuario
router.post('/usuarioNew', createUsuario);

// Obtener todos los usuarios
router.get('/usuarios', getUsuarios);

module.exports = router;
