const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reserva.controller');

// Crear una nueva reserva
router.post('/CrearReserva', reservaController.crearReserva);

// Obtener todas las reservas
router.get('/ObtenerReservas', reservaController.obtenerReservas);

// Obtener una reserva por ID
router.get('/ObtReserva/:id', reservaController.obtenerReservaPorId);

// Actualizar una reserva
router.put('/ActReserva/:id', reservaController.actualizarReserva);

// Eliminar una reserva
router.delete('/EliminarReserva/:id', reservaController.eliminarReserva);

module.exports = router;
