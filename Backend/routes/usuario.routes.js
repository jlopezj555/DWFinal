// usuario.routes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Ruta para iniciar sesión
router.post('/login', usuarioController.loginUsuario);

// Crear un nuevo usuario (accesible sin autenticación)
router.post('/crearUsuario', usuarioController.crearUsuario);

// Obtener todos los usuarios (solo administrador)
router.get('/ObtenerUsuario', authMiddleware, adminMiddleware, usuarioController.obtenerUsuarios);

// Obtener un usuario por ID (solo administrador)
router.get('/ObtenerUsuario/:id', authMiddleware, adminMiddleware, usuarioController.obtenerUsuarioPorId);

// Actualizar un usuario (solo autenticado)
router.put('/ActUsuario/:id', authMiddleware, usuarioController.actualizarUsuario);

// Eliminar un usuario (solo administrador)
router.delete('/Eliminar/:id', authMiddleware, adminMiddleware, usuarioController.eliminarUsuario);

module.exports = router;
