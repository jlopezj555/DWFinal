const Reserva = require('../models/reserva.model');

// Crear una nueva reserva
exports.createReserva = async (req, res) => {
  try {
    const nuevaReserva = new Reserva(req.body);
    const reservaGuardada = await nuevaReserva.save();
    res.status(201).json(reservaGuardada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todas las reservas
exports.getReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find();
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
