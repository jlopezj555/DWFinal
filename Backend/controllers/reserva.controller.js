// reservaController.js
const Reserva = require('../models/reserva.model'); // Ajusta el path si es necesario
const Espacio = require('../models/espacio.model');

exports.crearReserva = async (req, res) => {
  try {
    const usuarioId = req.user.id; // Asegúrate de que el middleware de autenticación agrega `user` al request
    const { espacio_id, fecha_reserva, hora_inicio, hora_fin } = req.body;

    // Verificamos que el espacio existe
    const espacio = await Espacio.findById(espacio_id);
    if (!espacio) {
      return res.status(404).json({ message: 'Espacio no encontrado' });
    }

    // Creamos la reserva
    const nuevaReserva = new Reserva({
      usuario_id: usuarioId,
      espacio_id,
      fecha_reserva,
      hora_inicio,
      hora_fin,
      estado: 'confirmada' // Puedes cambiar esto si deseas permitir otros estados
    });

    await nuevaReserva.save();
    res.status(201).json({
      message: 'Reserva creada exitosamente',
      reserva: nuevaReserva
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Obtener todas las reservas
exports.obtenerReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find().populate('usuario_id', 'nombre email').populate('espacio_id', 'tipo_espacio ubicacion');
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una reserva por ID
exports.obtenerReservaPorId = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id).populate('usuario_id', 'nombre email').populate('espacio_id', 'tipo_espacio ubicacion');
    if (!reserva) return res.status(404).json({ message: 'Reserva no encontrada' });
    res.json(reserva);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.actualizarReserva = async (req, res) => {
  try {
    const { fecha_reserva, hora_inicio, hora_fin, estado } = req.body;

    // Solo convierte `fecha_reserva` a tipo `Date`, mantén `hora_inicio` y `hora_fin` como cadenas
    const reservaActualizada = await Reserva.findByIdAndUpdate(
      req.params.id,
      { 
        fecha_reserva: new Date(fecha_reserva),  // Solo convierte fecha_reserva
        hora_inicio,  // Mantén hora_inicio como cadena
        hora_fin,     // Mantén hora_fin como cadena
        estado 
      },
      { new: true }
    );

    if (!reservaActualizada) return res.status(404).json({ message: 'Reserva no encontrada' });
    res.json({ message: 'Reserva actualizada correctamente', reserva: reservaActualizada });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// Eliminar una reserva
exports.eliminarReserva = async (req, res) => {
  try {
    const reservaEliminada = await Reserva.findByIdAndDelete(req.params.id);
    if (!reservaEliminada) return res.status(404).json({ message: 'Reserva no encontrada' });
    res.json({ message: 'Reserva eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Obtener una reserva por ID para el usuario autenticado
exports.obtenerReservaUsuario = async (req, res) => {
  try {
    // Obtener el ID de la reserva desde los parámetros y el ID del usuario desde `req.user`
    const { id } = req.params;
    const userId = req.user.id;

    // Buscar la reserva que coincida con el ID de reserva y el ID de usuario
    const reserva = await Reserva.findOne({ _id: id, usuario_id: userId });

    if (!reserva) {
      return res.status(404).json({ mensaje: 'Reserva no encontrada o no pertenece al usuario autenticado' });
    }

    res.json(reserva);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

