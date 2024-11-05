const Reserva = require('../models/reserva.model');
const Espacio = require('../models/espacio.model');
const Usuario = require('../models/usuario.model');

// Crear una nueva reserva
exports.crearReserva = async (req, res) => {
  try {
    const reserva = new Reserva(req.body);
    await reserva.save();

    // Actualizar el historial de reservas del usuario
    await Usuario.findByIdAndUpdate(reserva.usuario_id, { $push: { historial_reservas: reserva._id } });
    // Agregar la reserva al espacio
    await Espacio.findByIdAndUpdate(reserva.espacio_id, { $push: { reservas: reserva._id } });

    res.status(201).json(reserva);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todas las reservas
exports.obtenerReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find();
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una reserva por ID
exports.obtenerReservaPorId = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id);
    if (!reserva) return res.status(404).json({ message: 'Reserva no encontrada' });
    res.json(reserva);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una reserva
exports.actualizarReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reserva) return res.status(404).json({ message: 'Reserva no encontrada' });
    res.json(reserva);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una reserva
exports.eliminarReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndDelete(req.params.id);
    if (!reserva) return res.status(404).json({ message: 'Reserva no encontrada' });

    // Eliminar la referencia en el historial del usuario y en el espacio
    await Usuario.findByIdAndUpdate(reserva.usuario_id, { $pull: { historial_reservas: reserva._id } });
    await Espacio.findByIdAndUpdate(reserva.espacio_id, { $pull: { reservas: reserva._id } });

    res.json({ message: 'Reserva eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
