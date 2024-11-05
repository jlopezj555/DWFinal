const express = require('express');
const router = express.Router();
const espacioController = require('../controllers/espacio.controller');

// Crear un nuevo espacio
router.post('/crearEspacio', espacioController.crearEspacio);

// Obtener todos los espacios
router.get('/ObtEspacios', espacioController.obtenerEspacios);

// Obtener un espacio por ID
router.get('/ObtEspacios/:id', espacioController.obtenerEspacioPorId);

// Actualizar un espacio
router.put('/ActEspacio/:id', espacioController.actualizarEspacio);

// Eliminar un espacio
router.delete('/EliminarEspacio/:id', espacioController.eliminarEspacio);

module.exports = router;
