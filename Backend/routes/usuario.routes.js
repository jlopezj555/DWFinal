const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Ruta para iniciar sesión
router.post('/login', usuarioController.loginUsuario);

// Crear un nuevo usuario
router.post('/crearUsuario',  usuarioController.crearUsuario);

// Obtener todos los usuarios
router.get('/ObtenerUsuario',  authMiddleware, adminMiddleware, usuarioController.obtenerUsuarios);

// Obtener un usuario por ID
router.get('/ObtenerUsuario/:id',  authMiddleware, adminMiddleware, usuarioController.obtenerUsuarioPorId);

// Actualizar un usuario
router.put('/ActUsuario/:id',   authMiddleware, usuarioController.actualizarUsuario);

// Eliminar un usuario
router.delete('/Eliminar/:id',  authMiddleware, adminMiddleware, usuarioController.eliminarUsuario);

module.exports = router;
