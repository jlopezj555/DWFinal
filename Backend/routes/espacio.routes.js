const express = require('express');
const router = express.Router();
const espacioController = require('../controllers/espacio.controller');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');


// Crear un nuevo espacio
router.post('/crearEspacio', authMiddleware, adminMiddleware, espacioController.crearEspacio);

// Obtener todos los espacios
router.get('/ObtEspacios',  authMiddleware,  espacioController.obtenerEspacios);

// Obtener un espacio por ID
router.get('/ObtEspacios/:id', authMiddleware,  espacioController.obtenerEspacioPorId);

// Actualizar un espacio
router.put('/ActEspacio/:id', authMiddleware, adminMiddleware, espacioController.actualizarEspacio);

// Eliminar un espacio
router.delete('/EliminarEspacio/:id', authMiddleware, adminMiddleware, espacioController.eliminarEspacio);

module.exports = router;
