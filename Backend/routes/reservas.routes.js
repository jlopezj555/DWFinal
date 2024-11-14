const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reserva.controller');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Crear una nueva reserva
router.post('/CrearReserva', authMiddleware, reservaController.crearReserva);

// Obtener todas las reservas
router.get('/ObtenerReservas',  authMiddleware, adminMiddleware, reservaController.obtenerReservas);

// Obtener una reserva por ID
router.get('/ObtReserva/:id',  authMiddleware, reservaController.obtenerReservaPorId);

// Actualizar una reserva
router.put('/ActReserva/:id', authMiddleware, reservaController.actualizarReserva);

// Eliminar una reserva
router.delete('/EliminarReserva/:id', authMiddleware, reservaController.eliminarReserva);

// Obtener una reserva por ID solo para el usuario autenticado
router.get('/ObtReservaUsuario/:id', authMiddleware, reservaController.obtenerReservaUsuario);



module.exports = router;