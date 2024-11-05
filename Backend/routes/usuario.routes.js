const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

// Crear un nuevo usuario
router.post('/crearUsuario', usuarioController.crearUsuario);

// Obtener todos los usuarios
router.get('/ObtenerUsuario', usuarioController.obtenerUsuarios);

// Obtener un usuario por ID
router.get('/ObtenerUsuario/:id', usuarioController.obtenerUsuarioPorId);

// Actualizar un usuario
router.put('/ActUsuario/:id', usuarioController.actualizarUsuario);

// Eliminar un usuario
router.delete('/Eliminar/:id', usuarioController.eliminarUsuario);

module.exports = router;
