const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reserva.controller');

// Crear una nueva reserva
router.post('/', reservaController.createReserva);

// Obtener todas las reservas
router.get('/', reservaController.getReservas);

module.exports = router;
